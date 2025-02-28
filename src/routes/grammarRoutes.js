const express = require("express");
const router = express.Router();
const grammarController = require("../controllers/grammarController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/check", authMiddleware, grammarController.checkGrammar);

module.exports = router;
