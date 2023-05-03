//library imports
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

//Styling imports 
import "./App.css";

//Components imports
import Landing from "./routes/Landing";
import { AuthContext } from "./context/authContext";
import SelectRoom from "./routes/SelectRoom";
import Chat from "./routes/Chat";


/*The App component is the main component of this application.
  Here is where the routes of the application are established, 
  - the landing page
  - the select room page
  - the chat page
  All these routes are wrapped within AuthContext.Provider, this gives
  access to the global state "authState" throughout every route in the application. 
  A useEffect makes an http get request to the server on every re-render. 
  The get request sends the google token stored in session storage to the server
  where a middleware verifies if it is valid. 
  The get request makes sure the authState is updated accordingly.
*/

function App() {
  //global authState
  const [authState, setAuthState] = useState({
    userId: "",
    name: "",
    email: "",
    picture: "",
    loggedIn: false,
    room: ""
  });
  //global joined State
  //joined global state used to determine if user has joined a chat room
  const [joined, setJoined] = useState(false)

  //EFFECTS: makes sure on every re-render the authState persists.
  //We use validateToken middleware on backend to check
  //the google token stored in sesssion storage is valid.
  useEffect(() => {
    axios
      .get("https://chat-app-server-0.herokuapp.com/users/auth", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          //if user is not authenticated, set authState loggedIn value to false
          setAuthState({ ...authState, loggedIn: false });
          alert("User not logged in");
        } else {
          //if user is authenticated, set authState loggeIn value to true and set user's data
          //console.log(response);
          const googleProfileObject = response.data;
          setAuthState({
            userId: googleProfileObject.sub,
            name: googleProfileObject.given_name,
            email: googleProfileObject.email,
            picture: googleProfileObject.picture,
            loggedIn: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState, joined, setJoined }}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="selectroom" element={<SelectRoom />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
