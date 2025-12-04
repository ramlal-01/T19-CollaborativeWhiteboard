const mongoose = require("mongoose");

// 💬 Chat message schema
// Stores a single message inside a whiteboard session (board)
const chatSchema = new mongoose.Schema(
  {
    // Reference to the board (whiteboard session)
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true, // faster to query all messages for a board
    },

    // User who sent this message
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Text content of the message
    message: {
      type: String,
      required: true,
      trim: true, // remove extra spaces at start/end
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// Optional: compound index (board + createdAt) for sorting chats by time per board
chatSchema.index({ boardId: 1, createdAt: 1 });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
