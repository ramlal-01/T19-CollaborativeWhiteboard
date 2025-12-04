const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Collaborative Whiteboard API is running 🚀" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);

module.exports = app;
