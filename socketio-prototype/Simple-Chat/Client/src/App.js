import './App.css';
import io from 'socket.io-client'
import { useEffect, useState }  from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMesssage] = useState(""); // the message sent
  const [messageReceived, setMessageReceived] = useState(""); // the message recived from the other user
  const sendMessage = () => { //emits an event that would be received to the backend
    socket.emit("send_message", { message });
  };

  //this useEffect hook will be used whenever a message is received
  useEffect(() => {
    socket.on("receive_message", (data) => { // uses a call back funciton
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input 
        placeholder="Message....." 
        onChange={(event) => {
          setMesssage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message </button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
