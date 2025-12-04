const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Collaborative Whiteboard API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);

module.exports = app;
