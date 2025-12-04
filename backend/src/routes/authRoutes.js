const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Debugging: log types so we can see what's undefined
console.log("DEBUG authController types:", {
  register: typeof authController.register,
  login: typeof authController.login,
  getMe: typeof authController.getMe,
});
console.log("DEBUG authMiddleware types:", {
  protect: typeof authMiddleware.protect,
  adminOnly: typeof authMiddleware.adminOnly,
});

const { register, login, getMe } = authController;
const { protect } = authMiddleware;

// Normal routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
