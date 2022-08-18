This is the client side architecture for a React Chat application. In the app, users are able to login/register with Google. 

This was developed using the [OAuth2.0 library](https://developers.google.com/identity/protocols/oauth2). 

Once the user is registered, they are able to join their room of preference to chat with other users. 

[Socket.io client](https://socket.io/docs/v4/client-api/) was used to create web sockets that allow the user to send real time data to the server and back. 

I also developed the backend server which handles the sharing of data throughout the chat rooms. You can check out the repo here [ChatAppServer](https://github.com/elewites/ChatAppServer). 


The app is deployed with Netlify and can be accessed here: [StudentCord](https://student-cord.netlify.app/).


# Purpose

1. I wanted to improve my skills using websockets and real time data sharing. 

2. I wanted more exposure to the design process involved in creating a full stack application. 
- The project gave me valuable experience with backend-frontend architecture and how these two components communicate to each other.  

2. I also wanted to explore using [Google OAuth2.0 library](https://developers.google.com/identity/protocols/oauth2) since it has become a very popular 
form of authenticating users in web applications. 

## Installation

The app is already deployed so you can play around with the final product using this [link](https://student-cord.netlify.app/).

If you wish to run the app locally, clone this repo and install the dependencies. 

```
$ git clone https://github.com/elewites/ChatAppClient.git
$ cd chatapp
$ npm install 
```

Once the dependencies install, run the following command on your terminal:

`npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Learn More 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## App Design
- The app is built as a responsive web app to fit desktop, laptop, and mobile screens.

## User Stories
### The following user stories helped me organize the development of the app and visualize the end result. 

1. In this app the user is able to authenticate their persona with Google. This allows them to register/login easily into the application. 

2. The user is able to select a room of their choice from a list of 5 rooms. 

3. Once the user has connected to a room, they are able to send messages to the room and recieve messages from everyone else in the room. 

4. The user is able to logout whenever they want via a logout button.

5. The login state of the user persists for a period of time in the session storage as long as the browser window is not closed.

