import React from "react";
import "./App.css";
import MyNav from "./components/navbar/index";
/*import Application from "./pages/familyForm/familyForm";*/
import HomePage from "./pages/home";
/*import SigningDone from "./pages/signingCompleted/signingCompleted";*/
import { Router } from "@reach/router";
import Register from './components/Register';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import { Routes, Route} from 'react-router-dom';
import AdminPage from "./pages/admin";
import FamilyForm from "./pages/application";
import SigningDone from "./pages/signingCompleted";

const ROLES = {
  'User': 2001,
}

function App() {
  return (
    <div className="App">
        <MyNav></MyNav>
        <Router>
          <HomePage path="/"></HomePage>
          <FamilyForm path ="/application"></FamilyForm>
          <SigningDone path="signingDone"></SigningDone>
        </Router>
      <Routes>
      
      {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      
      {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="admin" element = { <AdminPage /> }/>
        </Route>      

      </Routes>   
    </div>
  );
}

export default App;
