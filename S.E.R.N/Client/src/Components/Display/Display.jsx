import { useEffect } from 'react';
import './Display.css';

function Display({ socket, room, messages, setMessages }) {
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => socket.off("receive_message");
  }, [socket, setMessages]);

  if (!room) {
    return <div className="displayContainer">Join a room to start chatting</div>;
  }

  return (
    <div className="displayContainer">
      <ul className="text">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Display;
