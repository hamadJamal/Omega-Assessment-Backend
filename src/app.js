const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const grammarRoutes = require("./routes/grammarRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/grammar", grammarRoutes);

module.exports = app;
