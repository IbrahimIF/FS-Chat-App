import { io } from "socket.io-client";

const socket = io(
  import.meta.env.PROD
    ? "https://your-sern-backend.onrender.com"
    : "http://localhost:3001",
  {
    transports: ["websocket"],
    withCredentials: false,
  }
);

export default socket;
