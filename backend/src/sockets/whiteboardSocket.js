const jwt = require("jsonwebtoken");
const Board = require("../models/Board");

// 🎨 Whiteboard Socket Handler
// Handles real-time events for a single Socket.IO server instance
const whiteboardSocket = (io) => {
  // When a new client connects
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // -------------------------
    // JOIN BOARD EVENT
    // Frontend: socket.emit("join-board", { token, boardId })
    // -------------------------
    socket.on("join-board", async ({ token, boardId }) => {
      try {
        if (!token || !boardId) {
          return socket.emit("error", "Token and boardId are required");
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Optional validation: check if board actually exists
        const board = await Board.findById(boardId);
        if (!board) {
          return socket.emit("error", "Board not found");
        }

        // Attach useful data to socket instance
        socket.join(boardId);
        socket.boardId = boardId;
        socket.userId = decoded.id;

        console.log(`✅ User ${decoded.id} joined board ${boardId}`);

        socket.emit("joined-board", { success: true, boardId });
      } catch (err) {
        console.error("join-board error:", err.message);
        socket.emit("error", "Invalid or expired token");
      }
    });

    // -------------------------
    // DRAW EVENT (broadcast to others)
    // Frontend: socket.emit("draw-event", strokeData)
    // -------------------------
    socket.on("draw-event", (data) => {
      if (!socket.boardId) return; // ignore if not in a board
      // Send to everyone else in the same board room
      socket.to(socket.boardId).emit("draw-event", {
        ...data,
        fromUserId: socket.userId,
      });
    });

    // -------------------------
    // CHAT EVENT
    // Frontend: socket.emit("chat-message", "hello")
    // -------------------------
    socket.on("chat-message", (msg) => {
      if (!socket.boardId) return;

      io.to(socket.boardId).emit("chat-message", {
        userId: socket.userId,
        message: msg,
        timestamp: new Date().toISOString(),
      });
    });

    // -------------------------
    // DISCONNECT EVENT
    // -------------------------
    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);

      if (socket.boardId && socket.userId) {
        // Optional: notify others in the board room that user left
        socket.to(socket.boardId).emit("user-left", {
          userId: socket.userId,
          socketId: socket.id,
        });
      }
    });
  });
};

module.exports = whiteboardSocket;
