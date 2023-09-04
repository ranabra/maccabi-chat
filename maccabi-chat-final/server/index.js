require("dotenv").config();
const API_ENDPOINT = process.env["API_ENDPOINT"];
const PROJECT_ID = process.env["PROJECT_ID"];

const express = require("express");
const app = express();
const http = require("http");

// Define port to run on
const port = 3001;

// Avoid CORS problems
const cors = require("cors");

const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    const sdk = require("node-appwrite");

    // Init SDK
    const client = new sdk.Client();

    const account = new sdk.Account(client);

    client
      .setEndpoint(API_ENDPOINT) // AppWrite API Endpoint
      .setProject(PROJECT_ID) // AppWrite project ID
      .setJWT(`${data.clientAuthToken}`); // JWT token

    // Checking on the server using Oauth 2.0 JWT token we received from the client-side
    const promise = account.get();

    // If auther's account is authenticated and valid,
    // then allow the message to be emmited to the chat window for others to see/read.
    promise.then(
      function (response) {
        socket.to(data.room).emit("receive_message", data);
      },
      function (error) {
        console.error("Error: ", error);
      }
    );
  });

  socket.on("send_isCurrentUserActive", (data) => {
    socket.to(data.room).emit("receive_isOtherUserActive", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log("SERVER RUNNING at port: " + port);
});
