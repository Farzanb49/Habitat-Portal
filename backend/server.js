require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');
const connectDB = require('./config/dbConn');
const session = require("express-session"); // https://github.com/expressjs/session
const MemoryStore = require("memorystore")(session); // https://github.com/roccomuso/memorystore
const DsJwtAuth = require("./DSJwtAuth");
const passport = require("passport");
const DocusignStrategy = require("passport-docusign");
const dsConfig = require("../config/index.js").config;
const helmet = require("helmet"); // https://expressjs.com/en/advanced/best-practice-security.html
const moment = require("moment");
const csrf = require("csurf"); // https://www.npmjs.com/package/csurf
const eg001 = require("./embeddedSigning");
const documentInfo = require("./documentInfo");
const documents = require("./documents").documents;
const PORT = process.env.PORT || 3500;
HOST = process.env.HOST || "localhost",
max_session_min = 180;
let hostUrl = "http://" + HOST + ":" + PORT;

const app = express()
  .use(helmet())
  .use(express.static(path.join(__dirname, "public")))
  .use(cookieParser())
  .use(
    session({
      secret: dsConfig.sessionSecret,
      name: "ds-launcher-session",
      cookie: { maxAge: max_session_min * 60000 },
      saveUninitialized: true,
      resave: true,
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json())
  .use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.session = req.session;
    res.locals.hostUrl = hostUrl; // Used by DSAuthCodeGrant#logout
    next();
  })
  .use((req, res, next) => {
    req.dsAuthJwt = new DsJwtAuth(req);
    req.dsAuth = req.dsAuthJwt;
    next();
  });

//app.use(express.static("../frontend/build"));
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});  

// authenticating anonymous user with JWT authorization
app.post("/api/login", (req, res, next) => {
  req.dsAuthJwt.login(req, res, next);
});
// submitting the "apply for aid" family form
app.post("/api/eg001/family", (req, res, next) =>
  handleFormSubmission(
    req,
    res,
    next,
    [documents.FAMILY, documents.ADMIN],
    "Habitat for Humanity Application"
  )
);

// handles submitting a form
async function handleFormSubmission(req, res, next, docTypes, collectionName) {
  const envDetails = documentInfo.makeEnvelopeDetails(
    docTypes,
    req,
    res
  );

  await eg001
    .createController(
      req,
      res,
      envDetails.docPaths,
      envDetails.displayName,
      envDetails.prefillVals,
      envDetails.dsTabs,
      envDetails.recipients
    )
    .catch((error) => {
      res.statusCode = 400;
      console.log(error);
      next();
    });
}

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
let scope = ["signature"];
let docusignStrategy = new DocusignStrategy(
  {
    production: dsConfig.production,
    clientID: dsConfig.dsClientId,
    scope: scope.join(" "),
    clientSecret: dsConfig.dsClientSecret,
    callbackURL: "http://localhost:3000/hp/callback",
    state: true, // automatic CSRF protection.
    // See https://github.com/jaredhanson/passport-oauth2/blob/master/lib/state/session.js
  },
  function _processDsResult(accessToken, refreshToken, params, profile, done) {
    // The params arg will be passed additional parameters of the grant.
    // See https://github.com/jaredhanson/passport-oauth2/pull/84
    //
    // Here we're just assigning the tokens to the account object
    // We store the data in DSAuthCodeGrant.getDefaultAccountInfo
    let user = profile;
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.expiresIn = params.expires_in;
    user.tokenExpirationTimestamp = moment().add(user.expiresIn, "s"); // The dateTime when the access token will expire
    return done(null, user);
  }
);

/**
 * The DocuSign OAuth default is to allow silent authentication.
 * An additional OAuth query parameter is used to not allow silent authentication
 */
if (!dsConfig.allowSilentAuthentication) {
  // See https://stackoverflow.com/a/32877712/64904
  docusignStrategy.authorizationParams = function (options) {
    return { prompt: "login" };
  };
}
passport.use(docusignStrategy);

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3500, function(){
      console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
});

