const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    inviteCode: String,
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: String
      }
    ],
    contentJSON: { type: Object, default: {} },
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", boardSchema);
