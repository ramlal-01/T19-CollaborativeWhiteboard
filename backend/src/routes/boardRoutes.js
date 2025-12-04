const express = require("express");
const router = express.Router();

// Middleware
const { protect } = require("../middleware/authMiddleware");

// Controllers
const {
  createBoard,
  getMyBoards,
  getBoardById,
  joinBoardByCode,
  saveBoard
} = require("../controllers/boardController");

// Board routes
router.post("/", protect, createBoard);          // Create new board
router.get("/", protect, getMyBoards);           // Get all boards of user
router.get("/:id", protect, getBoardById);       // Get a board by ID
router.post("/join", protect, joinBoardByCode);  // Join using board code

// Save / update route
router.put("/:id/save", protect, saveBoard);     // Save board content

module.exports = router;
