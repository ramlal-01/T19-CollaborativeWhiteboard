const jwt = require("jsonwebtoken");
const Board = require("../models/Board");

const whiteboardSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    // STEP 1: User joins a board room
    // Frontend will emit: socket.emit("join-board", { token, boardId })
    socket.on("join-board", async ({ token, boardId }) => {
      try {
        if (!token || !boardId) {
          return socket.emit("error", "Token and boardId are required");
        }

        // Decode JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Check if board exists and user is a participant
        const board = await Board.findById(boardId);
        if (!board) {
          return socket.emit("error", "Board not found");
        }

        const participant = board.participants.find(
          (p) => p.user.toString() === userId.toString()
        );

        if (!participant) {
          return socket.emit("error", "You are not a participant of this board");
        }

        // Attach info to socket
        socket.boardId = boardId;
        socket.userId = userId;
        socket.userRole = participant.role; // "owner" | "editor" | "viewer"

        // Join socket room
        socket.join(boardId);
        console.log(`✅ User ${userId} joined board ${boardId}`);

        // Notify others in room
        socket.to(boardId).emit("user-joined", {
          userId,
          role: participant.role,
          socketId: socket.id,
        });

        // Acknowledge to this user
        socket.emit("joined-board", {
          boardId,
          role: participant.role,
        });
      } catch (err) {
        console.error("join-board error:", err);
        socket.emit("error", "Invalid or expired token");
      }
    });

    // Helper: allow only owners/editors to modify board
    const canEdit = (socket) => {
      return socket.userRole === "owner" || socket.userRole === "editor";
    };

    // STEP 2: Drawing events (pen strokes)
    // Frontend: socket.emit("draw-event", strokeData)
    socket.on("draw-event", (data) => {
      if (!socket.boardId) return;
      if (!canEdit(socket)) {
        return socket.emit("error", "Viewers cannot draw");
      }
      // Broadcast to everyone else in the board room
      socket.to(socket.boardId).emit("draw-event", {
        userId: socket.userId,
        ...data,
      });
    });

    // STEP 3: Eraser events
    // Frontend: socket.emit("erase-event", eraseData)
    socket.on("erase-event", (data) => {
      if (!socket.boardId) return;
      if (!canEdit(socket)) {
        return socket.emit("error", "Viewers cannot erase");
      }
      socket.to(socket.boardId).emit("erase-event", {
        userId: socket.userId,
        ...data,
      });
    });

    // STEP 4: Shapes (rect, circle, line etc.)
    // Frontend: socket.emit("shape-event", shapeData)
    socket.on("shape-event", (data) => {
      if (!socket.boardId) return;
      if (!canEdit(socket)) {
        return socket.emit("error", "Viewers cannot add shapes");
      }
      socket.to(socket.boardId).emit("shape-event", {
        userId: socket.userId,
        ...data,
      });
    });

    // STEP 5: Text tool
    // Frontend: socket.emit("text-event", textData)
    socket.on("text-event", (data) => {
      if (!socket.boardId) return;
      if (!canEdit(socket)) {
        return socket.emit("error", "Viewers cannot add text");
      }
      socket.to(socket.boardId).emit("text-event", {
        userId: socket.userId,
        ...data,
      });
    });

    // STEP 6: Cursor movement (for live cursors)
    // Frontend: socket.emit("cursor-move", { x, y })
    socket.on("cursor-move", (data) => {
      if (!socket.boardId) return;
      socket.to(socket.boardId).emit("cursor-move", {
        userId: socket.userId,
        ...data,
      });
    });

    // STEP 7: Chat messages
    // Frontend: socket.emit("chat-message", "hello everyone")
    socket.on("chat-message", (message) => {
      if (!socket.boardId) return;
      io.to(socket.boardId).emit("chat-message", {
        userId: socket.userId,
        message,
        timestamp: new Date().toISOString(),
      });
    });

    // STEP 8: Disconnect handling
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
      if (socket.boardId && socket.userId) {
        socket.to(socket.boardId).emit("user-left", {
          userId: socket.userId,
          socketId: socket.id,
        });
      }
    });
  });
};

module.exports = whiteboardSocket;
