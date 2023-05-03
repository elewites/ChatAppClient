//library imports 
import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//component imports
import { AuthContext } from "../context/authContext";

function Login() {
  //global states from AuthContext
  const { authState, setAuthState } = useContext(AuthContext);

  //navigation hook
  const navigate = useNavigate();

  //EFFECTS: handles login, sends google tokenId to server for authentication;
  //         if user is authenticated, authState is updated with user data;
  //         loggedIn status is also set to true if user is authenticated
  const handleLogin = (response) => {
    //
    const googleProfileObject = response.profileObj;
    //
    const tokenId = response.tokenId;
    //post request to server with tokenId
    axios
      .get("https://chat-app-server-0.herokuapp.com/users/login", {
        headers: { token: tokenId }
      })
      .then((response) => {
        if (response.data.error) {
          //alert(response.data.error);
        } else {
          console.log(googleProfileObject)
          console.log(response.data)
          //saving google tokenId in session storage
          sessionStorage.setItem("token", tokenId);
          //we now know user is authenticated so we can now use their information
          //and store it the frontend global authState
          setAuthState({
            userId: googleProfileObject.googleId,
            name: googleProfileObject.givenName,
            email: googleProfileObject.email,
            picture: googleProfileObject.imageUrl,
            loggedIn: true,
          });

          console.log(response.data)

          //redirect user to room select page after user is authenticated and logged in
          navigate("/selectroom");
        }
      });
  };

  return (
    <div>
      <GoogleLogin
        className="google-login"
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;
