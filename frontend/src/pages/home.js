import React from "react";
import beposLogo from "../images/download.jfif";
import {
  Button,
  Popover,
  OverlayTrigger,
  Container,
  Image,
  Row,
  Col,
} from "react-bootstrap";
{/*import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <section>
            <h1>Welcome to your Habitat for Humanity Applicant Portal!</h1>
            {/*<br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/editor">Editors Page</Link>
    <Link to="/admin">Admin Page</Link>*/}
     {/*}   </section>
    )
}

export default HomePage*/}


class HomePage extends React.Component {
  render() {
    return (
      <section class = "justhome">
            <div className="Landing-card">
              <h1 >Welcome to Your Habitat for Humanity Portal!</h1>
              <p >
                Upload all your documents and then be automatically redirected to a fillable homeowner application form
                leveraged by DocuSign's API. Sign and submit and our admins will have instant access for viewing your submission.
                (Note: please ensure you meet all the requirements!){" "}
              </p>
            </div>
            <Button
              href="/application"
              size="lg"
              style={{
                background: "#00B5E2",
                fontFamily: "Nunito", 
              }}
              variant="success"
            >
              Get started
            </Button>
      </section>
    );
  }
}

export default HomePage;