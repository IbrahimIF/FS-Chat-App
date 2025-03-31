const express = require('express'); // web frameowkr for handling HTTP requests
const app = express(); 
const http = require("http"); // Low-Level server creation, recommended by socket.io, socket.io is created on a http server
const { Server } = require('socket.io'); // Real-time communication
const cors = require("cors"); // cross-origin resource sharing (security)

// require is a node.js function to import functionality from other files

app.use(cors()); // Allows browsers to connect from different domains

const server = http.createServer(app)

const io = new Server(server, { // io manages real-time connections
    cors: { // used for securoty reasons
        origin: "http://localhost:3000", // only allows connections from the React App
        methods: ["GET", "POST"], // only allows get and post requests
        allowedHeaders: ["Content-Type"], // Explicitly allow headers
        credentials: true, // Enable if using cookies/auth
    },
});


io.on("connection", (socket) => { // when a user connects to the server a message will appear
    console.log(`User Connected: ${socket.id}`) // provides a different ID for every new user connected

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => { //listens to an event and receives that data
        console.log('sending data')
        socket.to(data.room).emit("receive_message", data); // this allows you to send a messsage to others on the server but not yourself
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});



