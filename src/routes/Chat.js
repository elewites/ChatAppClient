//library imports
import React, { useContext, useState, useEffect } from "react";

//style imports
import "./css/chat.css";

//component imports
import { AuthContext } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

/*The Chat component is where the user sends texts with other users.F
 */
function Chat({ room, socket}) {
  //global auth state
  //joined global state used to determine if user has joined a chat room
  const { authState, setAuthState, setJoined } = useContext(AuthContext);
  //navigate object
  const navigate = useNavigate();
  //local states
  //used to render texts that THIS user and other users send
  const [text, setText] = useState("");
  const [textList, setTextList] = useState([]);

  //Effects: listens for messages recieved from server via the recieve_text event 
  useEffect(() => {
    socket.on("recieve_text", (data) => {
      setTextList([...textList, data]);
    });
  });

  //Send Message function
  //EFFECTS: sends text data to the send_text event;
  //text data contains the author of the text and the text itself.
  //also updates the textList state so that the newly sent text is rendered in the chat 
  const sendText = () => {
    let textData = {
      room: room,
      content: { author: authState.name, text: text },
    };
    socket.emit("send_text", textData);
    setTextList([...textList, textData.content]);
    setText("");
  };

  //Form Handling Functions
  //EFFECTS: allows the user to hit enter and the chat is sent, so they don't have to 
  //hit send every time
  const hitEnter = (e) => {
    if (e.keyCode === 13) {
      sendText();
    }
  };

  //EFFECTS: prevents the current page from refreshing every time a form is submitted
  const prevent = (e) => {
    e.preventDefault();
  };

  //EFFECTS: sets joined to false 
  const goBack = () => {
    setJoined(false)
  }

  return (
    <div className="chatContainer">
      <div className="chat-room">
        <p>{room}</p>
        <button onClick={() => goBack()}>Return</button>
      </div>
      <div className="messages">
        {textList.map((val, index) => {
          return (
            <div className={authState.name == val.author ? "single-message-yours" : "single-message-other"}>
              <p className="text">{val.text} </p>
              <p className="author">
                {authState.name == val.author ? "Me" : val.author}
              </p>
            </div>
          );
        })}
      </div>
      <form onSubmit={prevent} className="messageDiv">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          onKeyUp={hitEnter}
        ></input>
        <button type="reset" onClick={sendText}>
          Send
        </button>
      </form>
    </div >
  );
}

export default Chat;
