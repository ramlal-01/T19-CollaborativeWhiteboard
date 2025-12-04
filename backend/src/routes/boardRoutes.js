const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBoard,
  getMyBoards,
  getBoardById,
  joinBoardByCode,
  saveBoard
} = require("../controllers/boardController");

// Create board
router.post("/", protect, createBoard);

// Dashboard boards list
router.get("/", protect, getMyBoards);

// Open board
router.get("/:id", protect, getBoardById);

// Join board via invite code
router.post("/join", protect, joinBoardByCode);

// Save canvas data
router.put("/:id/save", protect, saveBoard);

module.exports = router;
