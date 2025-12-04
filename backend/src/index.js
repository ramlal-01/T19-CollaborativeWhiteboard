const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const connectDB = require("./config/db");

const app = require("./app");
const whiteboardSocket = require("./sockets/whiteboardSocket");

// Create HTTP server for both Express + Socket.io
const server = http.createServer(app);

// Socket.io config
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT"],
  },
});

// Connect to DB
connectDB();

// Initialize socket events
whiteboardSocket(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
