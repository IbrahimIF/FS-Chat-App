import './App.css';
import io from 'socket.io-client'
import { useEffect, useState }  from "react";

const socket = io.connect(process.env.REACT_APP_BACKEND_URL || "http://localhost:3001", {
  transports: ["websocket"], // Force WebSockets
  withCredentials: false // Match backend
});

function App() {
  const [room, setRoom] = useState("");
  const [message, setMesssage] = useState(""); // the message sent
  const [messageReceived, setMessageReceived] = useState(""); // the message recived from the other user

  const joinRoom = () => { //emits an event that would be received to the backend
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => { //emits an event that would be received to the backend
    socket.emit("send_message", { message, room });
  };


  //this useEffect hook will be used whenever a message is received
  useEffect(() => {
    socket.on("connect", () => console.log("Connected!"));
    socket.on("connect_error", (err) => console.log("Error:", err));
    socket.on("receive_message", (data) => { // uses a call back funciton
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
        <div className="App">
      <div className="background-pattern"></div>
      
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 20 L18 26 L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="logo-text">RealTime Chat</h1>
        </div>
        <div className={`status-indicator ${connectionStatus}`}>
          <span className="status-dot"></span>
          {connectionStatus === "connected" ? "Connected" : connectionStatus === "error" ? "Disconnected" : "Connecting..."}
        </div>
      </header>

      <main className="main-content">
        {!isInRoom ? (
          <div className="join-section fade-in">
            <div className="card">
              <h2 className="section-title">Join a Room</h2>
              <p className="section-description">Enter a room number to start chatting</p>
              
              <div className="input-group">
                <input 
                  className="input-field"
                  type="text"
                  placeholder="Room Number" 
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, joinRoom)}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={joinRoom}
                  disabled={!room.trim()}
                >
                  Join Room
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-section fade-in">
            <div className="card chat-card">
              <div className="chat-header">
                <h2 className="room-title">Room: {room}</h2>
                <button 
                  className="btn-text"
                  onClick={() => {
                    setIsInRoom(false);
                    setRoom("");
                    setMessageReceived("");
                  }}
                >
                  Leave Room
                </button>
              </div>

              <div className="messages-container">
                <div className="message-display">
                  {messageReceived ? (
                    <div className="message-bubble received">
                      <div className="message-header">Received Message</div>
                      <div className="message-text">{messageReceived}</div>
                      <div className="message-time">{new Date().toLocaleTimeString()}</div>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                        <path d="M20 30 L28 38 L40 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>
                      </svg>
                      <p>Waiting for messages...</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="input-section">
                <div className="input-group">
                  <input 
                    className="input-field message-input"
                    type="text"
                    placeholder="Type your message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, sendMessage)}
                  />
                  <button 
                    className="btn btn-send" 
                    onClick={sendMessage}
                    disabled={!message.trim()}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 10 L18 2 L12 18 L10 12 L2 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with Socket.IO • Real-time messaging</p>
      </footer>
    </div>
  );
}

export default App;
