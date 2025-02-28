const openaiUtils = require("../utils/openaiUtils");

async function checkGrammar(text) {
  const userTokens = text.split(/\s+/);
  const gptIncorrectWords = await openaiUtils.getIncorrectWords(text);
  const incorrectTokens = [];
  const usedIndexes = new Set();

  for (const { original, suggestion } of gptIncorrectWords) {
    for (let i = 0; i < userTokens.length; i++) {
      if (usedIndexes.has(i)) continue;
      if (userTokens[i] === original) {
        incorrectTokens.push({ index: i, original, suggestion });
        usedIndexes.add(i);
      }
    }
  }

  return {
    success: true,
    data: { incorrectTokens },
    error: null,
  };
}

module.exports = { checkGrammar };
