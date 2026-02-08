import { useState } from 'react';
import socket from '../../socket';
import './Button.css';

function Button({ room, setRoom, setMessages }) {
  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if (room.trim()) {
      socket.emit("join_room", room);
      setMessages([]); // reset chat on join
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      room,
      message,
    });
    setMessages((prev) => [...prev, { text: message, type: "sent" }]);
    setMessage("");
  };

  return (
    <div className="buttonContainer">
      <input
        className="input roomInput"
        placeholder="Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />

      <button className="sendButton" onClick={joinRoom}>
        {"Join"}
      </button>

      <input
        className="input messageInput"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="sendButton" onClick={sendMessage}>
        {"Send"}
      </button>
    </div>
  );
}

export default Button;