const Board = require("../models/Board");
const generateCode = require("../utils/generateCode");

// CREATE NEW BOARD
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    let code = generateCode();
    let exists = await Board.findOne({ inviteCode: code });

    while (exists) {
      code = generateCode();
      exists = await Board.findOne({ inviteCode: code });
    }

    const board = await Board.create({
      title: title || "Untitled Board",
      owner: req.user._id,
      inviteCode: code,
      participants: [{ user: req.user._id, role: "owner" }]
    });

    res.status(201).json(board);

  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// LOAD USER’S BOARDS → Dashboard
exports.getMyBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      "participants.user": req.user._id,
      isArchived: false
    }).sort({ updatedAt: -1 });

    res.json(boards);

  } catch (error) {
    console.error("Get Boards Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// OPEN BOARD → Whiteboard Page
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) return res.status(404).json({ message: "Not found" });

    const allowed = board.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );

    if (!allowed) return res.status(403).json({ message: "Access denied" });

    res.json(board);

  } catch (error) {
    console.error("Get Board Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// JOIN BOARD USING CODE
exports.joinBoardByCode = async (req, res) => {
  try {
    const { inviteCode } = req.body;

    const board = await Board.findOne({ inviteCode });
    if (!board) return res.status(404).json({ message: "Invalid Code" });

    const already = board.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );

    if (!already) {
      board.participants.push({ user: req.user._id, role: "editor" });
      await board.save();
    }

    res.json(board);

  } catch (error) {
    console.error("Join Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// SAVE CANVAS DATA TO DB
exports.saveBoard = async (req, res) => {
  try {
    const { contentJSON } = req.body;

    const board = await Board.findById(req.params.id);

    if (!board) return res.status(404).json({ message: "Board not found" });

    board.contentJSON = contentJSON;
    await board.save();

    res.json({ message: "Saved successfully" });

  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
