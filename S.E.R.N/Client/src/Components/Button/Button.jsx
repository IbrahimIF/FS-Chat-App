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

    setMessage("");
  };

  return (
    <div className="buttonContainer">
      <input
        placeholder="Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />

      <button onClick={joinRoom}>Join Room</button>

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Button;