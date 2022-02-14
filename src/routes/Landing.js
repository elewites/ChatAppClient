//library imports
import React, { useContext } from "react";

//style imports
import "./css/landing.css";

//component imports
import Login from "../components/Login";
import Logo from "../images/white_icon.png";
import StudentIcon from "../images/animated_student.png";
import { AuthContext } from "../context/authContext";
import LogoCord from "../components/LogoCord";

function Landing() {
  return (
    <div className="landing-container">
      <LogoCord />
      <div className="welcome-banner">
        <img alt="st_icon" src={StudentIcon}></img>
      </div>
      <div className="google-login">
        <Login />
      </div>
    </div>
  );
}

export default Landing;
