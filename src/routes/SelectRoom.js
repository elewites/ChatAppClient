//library imports
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

//style imports
import "./css/selectroom.css";

//component imports
import LogoCord from "../components/LogoCord";
import { AuthContext } from "../context/authContext";
import Student from "../images/group_studying.png"
import Chat from "./Chat";

//declaration of socket variable.
let socket;


/*The SelectRoom component is where the user selects a room to join the chat.*/
function SelectRoom() {
  /*navigation object.
    imported from react-router-dom library.
    facilitates re-routing to other routes when needed.
  */
  const navigate = useNavigate();

  //global authState; gives access to user state information
  //joined global state used to determine if user has joined a chat room
  const { authState, setAuthState, joined, setJoined } = useContext(AuthContext);

  //local states used within this component to selected a chat room
  const [room, setRoom] = useState('Student Life');

  //server endpoint
  const endpoint = "localhost:3001/";
  //socket variable is assigned a value
  //and on every re-render it connects to the given server endpoint 
  useEffect(() => {
    socket = io.connect(endpoint);
  }, []);

  //Join room button function
  //EFFECTS: connects the user to the selected room if they are logged in; re-routes to 
  //landing page otherwise
  const join = () => {
    if (!authState.loggedIn) {
      alert("Not Logged In");
      navigate("/")
    } else {
      setJoined(true)
      //helper function "connectRoom()"
      connectRoom()
    }
  }

  //Helper function
  //EFFECTS: conencts the user to the selected room via the join_room event;
  //also sends some data to the server endpoint bia the join_room event
  const connectRoom = () => {
    let data = { room: room, user: authState.name }
    socket.emit("join_room", data)
  };

  //Logout function
  //MODIFIES: session storage
  //EFFECTS: removes user token from session storage when funciton is called;
  //then re-routes user to landing page
  const logout = () => {
    //saving google tokenId in session storage
    sessionStorage.removeItem("token");
    navigate("/")
  }

  //if joined state is set to true, the Chat component is rendered
  //the Chat component recieves the room State and the current web socket as props
  if (joined) {
    return <Chat room={room} socket={socket} />
  } else {
    //if joined state is set to false, this renders:
    return (
      <div className="select-room-container">
        <LogoCord />
        <img alt="student" src={Student} className="studentImg"></img>
        <div className="select-room-user-info">
          <p className="select-room-label">Username</p>
          <p className="select-room-name" >{authState.name ? authState.name : "..."}</p>
          <p className="select-room-label">Select Room</p>
          <select name="room" id="room" onChange={(e) => {
            setRoom(e.target.value)
          }
          }>
            <option value="Student Life">Student Life</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Social">Social</option>
            <option value="Global News">Global News</option>
            <option value="Student Life">Sports</option>
            <option value="Gaming">Gaming</option>
          </select>
          <button className="join" onClick={() => { join() }}>Join</button>
          <button className="logout" onClick={() => logout()} >logout</button>
        </div>
      </div >
    );
  }
}

export default SelectRoom;
