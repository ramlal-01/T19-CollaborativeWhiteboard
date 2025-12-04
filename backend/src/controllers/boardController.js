const Board = require("../models/Board");
const generateCode = require("../utils/generateCode");

exports.createBoard = async (req, res) => {
  try {
    let inviteCode = generateCode();
    let exists = await Board.findOne({ inviteCode });

    while (exists) {
      inviteCode = generateCode();
      exists = await Board.findOne({ inviteCode });
    }

    const board = await Board.create({
      title: req.body.title || "Untitled",
      owner: req.user._id,
      inviteCode,
      participants: [{ user: req.user._id, role: "owner" }]
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      "participants.user": req.user._id,
      isArchived: false,
    });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    const isParticipant = board.participants.some(p => p.user.toString() === req.user._id.toString());
    if (!isParticipant) return res.status(403).json({ message: "No Access" });

    res.json(board);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.joinBoardByCode = async (req, res) => {
  try {
    const board = await Board.findOne({ inviteCode: req.body.inviteCode });
    if (!board) return res.status(404).json({ message: "Invalid Code" });

    const exists = board.participants.some(p => p.user.toString() === req.user._id.toString());

    if (!exists) {
      board.participants.push({ user: req.user._id, role: "editor" });
      await board.save();
    }

    res.json(board);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    board.contentJSON = req.body.contentJSON;
    await board.save();
    res.json({ message: "Saved" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
