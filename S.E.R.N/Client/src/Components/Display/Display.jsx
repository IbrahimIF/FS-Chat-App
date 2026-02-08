import { useEffect } from 'react';
import './Display.css';

function Display({ socket, room, messages, setMessages }) {
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { text: data.message, type: "received" }]);
    });

    return () => socket.off("receive_message");
  }, [socket, setMessages]);

  if (!room) {
    return (
      <div className="displayContainer">
        <div className="displayCard empty">
          <p>Join a room to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="displayContainer">
      <div className="displayCard">
        <div className="displayHeader">
          <span>Room</span>
          <strong>{room}</strong>
        </div>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.type || "sent"}`}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Display;
