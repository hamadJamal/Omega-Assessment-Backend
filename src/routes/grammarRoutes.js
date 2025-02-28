const express = require("express");
const router = express.Router();
const grammarController = require("../controllers/grammarController");
const authMiddleware = require("../middlewares/authMiddleware");

// POST /api/grammar/check
router.post("/check", authMiddleware, grammarController.checkGrammarController);

module.exports = router;
