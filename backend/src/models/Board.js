const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["owner", "editor", "viewer"], default: "editor" }
  },
  { _id: false }
);

const boardSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Untitled Board" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [participantSchema],
    inviteCode: { type: String, unique: true },
    contentJSON: { type: Object, default: {} }, // stores drawing data
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
