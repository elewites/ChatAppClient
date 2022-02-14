import React from 'react';
import logo_stu from "../images/white_icon.png";

//style imports
import "./css/logocord.css"

/*Logo of the App that that is used repeatedly through the application*/
function LogoCord() {
  return <div className="title">
    <p>StudentCord</p>
    <img alt="st_cord" src={logo_stu}></img>
  </div>
}

export default LogoCord;
