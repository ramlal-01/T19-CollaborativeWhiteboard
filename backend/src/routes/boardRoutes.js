const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createBoard, getMyBoards, getBoardById,
  joinBoardByCode, saveBoard
} = require("../controllers/boardController");

router.post("/", protect, createBoard);
router.get("/", protect, getMyBoards);
router.get("/:id", protect, getBoardById);
router.post("/join", protect, joinBoardByCode);
router.put("/:id/save", protect, saveBoard);

module.exports = router;
