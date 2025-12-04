const Board = require("../models/Board");
const generateCode = require("../utils/generateCode");

exports.createBoard = async (req, res) => {
  const inviteCode = generateCode();

  const board = await Board.create({
    title: req.body.title || "Untitled Board",
    inviteCode,
    owner: req.user._id,
    participants: [{ user: req.user._id, role: "owner" }]
  });

  res.status(201).json(board);
};

exports.getMyBoards = async (req, res) => {
  const boards = await Board.find({
    "participants.user": req.user._id
  });
  res.json(boards);
};

exports.getBoardById = async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) return res.status(404).json({ message: "Board not found" });

  const isParticipant = board.participants.some(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (!isParticipant) return res.status(403).json({ message: "No Access" });

  res.json(board);
};

exports.joinBoardByCode = async (req, res) => {
  const board = await Board.findOne({ inviteCode: req.body.inviteCode });
  if (!board) return res.status(404).json({ message: "Invalid Code" });

  const already = board.participants.some(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (!already)
    board.participants.push({ user: req.user._id, role: "editor" });

  await board.save();
  res.json(board);
};

exports.saveBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);
  board.contentJSON = req.body.contentJSON;
  await board.save();

  res.json({ message: "Whiteboard Saved" });
};
