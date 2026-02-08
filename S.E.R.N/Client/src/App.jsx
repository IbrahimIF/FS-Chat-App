import { useState } from 'react';
import Display from './Components/Display/Display';
import Button from './Components/Button/Button';
import Link from './Components/Link/Link';
import Logo from './Components/Logos/Logo';
import socket from './socket';
import './App.css';

function App() {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <>
      <div className="App">
        <Logo />
        <Display
          socket={socket}
          room={room}
          messages={messages}
          setMessages={setMessages}
        />
        
        <Button
          socket={socket}
          room={room}
          setRoom={setRoom}
          setMessages={setMessages}
        />
        <Link/>
      </div>
    </>
  );
}

export default App;