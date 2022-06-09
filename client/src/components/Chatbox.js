import React from "react";

const Chatbox = ({
  toggleChatBox,
  messages,
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className="chatBoxWrapper">
      <div className="chat-box chat-box-player1">
        <div className="chat-head" onClick={toggleChatBox}>
          <h2>Chat Box</h2>
        </div>
        <div className="chat-body">
          <div className="msg-insert text-black">
            {messages.map((msg) => {
              if (msg.user === "Player 2")
                return <div className="msg-receive">{msg.text}</div>;
              if (msg.user === "Player 1")
                return <div className="msg-send">{msg.text}</div>;
            })}
          </div>
          <div className="chat-text">
            <input
              className="text-black"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) =>
                event.key === "Enter" && sendMessage(event)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
