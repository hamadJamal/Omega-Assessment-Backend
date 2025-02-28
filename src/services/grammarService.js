const openaiUtils = require("../utils/openaiUtils");

/**
 * We rely on the structured JSON from OpenAI which gives us a list
 * of tokens, each with isCorrect and possibly a corrected form.
 * We'll just return that structure to the frontend.
 */
async function checkGrammar(text) {
  const tokens = await openaiUtils.getTokenAnalysis(text);

  return {
    success: true,
    data: {
      tokens,
    },
    error: null,
  };
}

module.exports = { checkGrammar };
