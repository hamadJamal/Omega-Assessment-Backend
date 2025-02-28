// getIncorrectWords.js

const OpenAI = require("openai").default;
const { OPENAI_API_KEY } = require("../config");

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function getIncorrectWords(userText) {
  const systemMessage = {
    role: "system",
    content: `
You are a spelling checker. For the user’s text:
1. Identify only the words that are spelled incorrectly. Consider each word separately and check its spelling.
2. For each misspelled word, return an object of the shape:
   { "original": "<incorrect>", "suggestion": "<corrected>" }
3. Collect all such objects into a JSON array.
4. If there are no misspelled words, return no output at all (an empty response).
5. Do not include any commentary, indexes, or additional text. Only return the JSON array if misspelled words exist.
`,
  };

  const userMessage = {
    role: "user",
    content: `Check the text for spelling mistakes. The text is:\n"${userText}"`,
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [systemMessage, userMessage],
      temperature: 0,
    });

    const content = response.choices[0]?.message?.content || "";

    let incorrectWords = [];
    try {
      if (content.trim().length > 0) {
        incorrectWords = JSON.parse(content);
        if (!Array.isArray(incorrectWords)) {
          throw new Error("GPT did not return an array");
        }
      }
    } catch (parseErr) {
      console.error("Error parsing GPT output as JSON:", parseErr);
      incorrectWords = [];
    }

    return incorrectWords;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return [];
  }
}

module.exports = {
  getIncorrectWords,
};
