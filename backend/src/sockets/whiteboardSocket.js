const jwt = require("jsonwebtoken");
const Board = require("../models/Board");
const User = require("../models/User");

// In-memory map of active participants per board: { [boardId]: Map<userId, { id, name }> }
const activeParticipants = {};

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

        // Look up user details for display name
        const user = await User.findById(decoded.id).select("name email");
        if (!user) {
          return socket.emit("error", "User not found");
        }

        const displayName = user.name || user.email || "Guest";

        // Attach useful data to socket instance
        socket.join(boardId);
        socket.boardId = boardId;
        socket.userId = decoded.id.toString();

        // Track active participants in memory
        if (!activeParticipants[boardId]) {
          activeParticipants[boardId] = new Map();
        }
        activeParticipants[boardId].set(socket.userId, {
          id: socket.userId,
          name: displayName,
        });

        const participantsList = Array.from(activeParticipants[boardId].values());

        console.log(`✅ User ${decoded.id} joined board ${boardId}`);

        // Notify everyone in the room of the updated participant list
        io.to(boardId).emit("participants-update", participantsList);

        socket.emit("joined-board", {
          success: true,
          boardId,
          user: { id: user._id, name: user.name, email: user.email },
        });
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
    // CLEAR BOARD EVENT
    // Frontend: socket.emit("clear-board")
    // -------------------------
    socket.on("clear-board", () => {
      if (!socket.boardId) return;
      io.to(socket.boardId).emit("clear-board");
    });

    // -------------------------
    // DRAWING ACTIVE (used to highlight who is drawing)
    // Frontend: socket.emit("drawing-start") / socket.emit("drawing-end")
    // -------------------------
    socket.on("drawing-start", () => {
      if (!socket.boardId) return;
      io.to(socket.boardId).emit("drawing-active", {
        userId: socket.userId,
        isDrawing: true,
      });
    });

    socket.on("drawing-end", () => {
      if (!socket.boardId) return;
      io.to(socket.boardId).emit("drawing-active", {
        userId: socket.userId,
        isDrawing: false,
      });
    });

    // -------------------------
    // CHAT EVENT
    // Frontend: socket.emit("chat-message", "hello")
    // -------------------------
    socket.on("chat-message", (msg) => {
      if (!socket.boardId) return;

      const boardId = socket.boardId;
      const participantsMap = activeParticipants[boardId];
      const sender = participantsMap ? participantsMap.get(socket.userId) : null;

      io.to(boardId).emit("chat-message", {
        userId: socket.userId,
        name: sender?.name || "Unknown",
        message: msg,
        timestamp: new Date().toISOString(),
      });
    });

    // -------------------------
    // LEAVE BOARD EVENT (explicit leave)
    // -------------------------
    socket.on("leave-board", () => {
      const { boardId, userId } = socket;
      if (!boardId || !userId) return;

      socket.leave(boardId);

      if (activeParticipants[boardId]) {
        activeParticipants[boardId].delete(userId.toString());
        const participantsList = Array.from(activeParticipants[boardId].values());
        io.to(boardId).emit("participants-update", participantsList);
      }

      socket.boardId = null;
    });

    // -------------------------
    // DISCONNECT EVENT
    // -------------------------
    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);

      if (socket.boardId && socket.userId && activeParticipants[socket.boardId]) {
        const boardId = socket.boardId;
        const userId = socket.userId.toString();

        activeParticipants[boardId].delete(userId);
        const participantsList = Array.from(activeParticipants[boardId].values());
        socket.to(boardId).emit("participants-update", participantsList);
      }
    });
  });
};

module.exports = whiteboardSocket;
