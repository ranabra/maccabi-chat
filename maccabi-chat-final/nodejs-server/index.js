const express = require("express");
const app = express();
const http = require("http");

// Avoid CORS problems
const cors = require("cors");

const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("64f1c9b7005f587b3dd6")          // Your project ID
      .setJWT(`${data.clientAuthToken}`);          // Your secret JSON Web Token

    const promise = account.get();

    promise.then(function (response) {
        // If auther's account is authenticated and valid, 
        // then allow the message to be emmited to the chat window for others to see/read.
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

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
