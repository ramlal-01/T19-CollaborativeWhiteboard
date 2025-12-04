const jwt = require("jsonwebtoken");
const Board = require("../models/Board");

const whiteboardSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // -------------------------
    // JOIN BOARD EVENT
    // -------------------------
    socket.on("join-board", async ({ token, boardId }) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const board = await Board.findById(boardId); // Validation placeholder

        socket.join(boardId);
        socket.boardId = boardId;
        socket.userId = decoded.id;

        socket.emit("joined-board", { success: true });
      } catch (err) {
        socket.emit("error", "Invalid Token");
      }
    });

    // -------------------------
    // DRAW EVENT (broadcast to others)
    // -------------------------
    socket.on("draw-event", (data) => {
      if (!socket.boardId) return;
      socket.to(socket.boardId).emit("draw-event", data);
    });

    // -------------------------
    // CHAT EVENT
    // -------------------------
    socket.on("chat-message", (msg) => {
      if (!socket.boardId) return;
      io.to(socket.boardId).emit("chat-message", {
        userId: socket.userId,
        msg,
      });
    });

    // -------------------------
    // DISCONNECT EVENT
    // -------------------------
    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

module.exports = whiteboardSocket;
