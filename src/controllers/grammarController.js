const grammarService = require("../services/grammarService");

exports.checkGrammar = async (req, res) => {
  try {
    const { text } = req.body;
    const result = await grammarService.checkGrammar(text);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
};
