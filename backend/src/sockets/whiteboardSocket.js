const jwt = require("jsonwebtoken");
const Board = require("../models/Board");

const whiteboardSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("join-board", async ({ token, boardId }) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const board = await Board.findById(boardId);

        socket.join(boardId);
        socket.boardId = boardId;
        socket.userId = decoded.id;

        socket.emit("joined-board", { success: true });
      } catch {
        socket.emit("error", "Invalid Token");
      }
    });

    socket.on("draw-event", (data) => {
      socket.to(socket.boardId).emit("draw-event", data);
    });

    socket.on("chat-message", (msg) => {
      io.to(socket.boardId).emit("chat-message", {
        userId: socket.userId,
        msg,
      });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

module.exports = whiteboardSocket;
