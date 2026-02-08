import { io } from "socket.io-client";

const socket = io(
  import.meta.env.PROD
    ? "https://chat-room-backend-lzp6.onrender.com/"
    : "http://localhost:3001",
  {
    transports: ["websocket"],
    withCredentials: false,
  }
);

export default socket;
