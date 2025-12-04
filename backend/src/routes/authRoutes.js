// Auth Routes - minor formatting update for new commit
const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Auth endpoints
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
