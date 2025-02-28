const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../config");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * This function prompts OpenAI to return a strict JSON array of objects,
 * each representing a token (word/punctuation) from the user’s text.
 * Example structure for each token:
 *   {
 *     "token": "Hello",
 *     "isCorrect": true,
 *     "suggestion": "Hello" // or optional if isCorrect = true
 *   }
 */
async function getTokenAnalysis(userText) {
  const systemMessage = {
    role: "system",
    content: "You are a grammar correction engine. You will split the user text into tokens and indicate which tokens are incorrect. Always return valid JSON only, no extra commentary.",
  };

  // We use a single user message for the prompt:
  const userMessage = {
    role: "user",
    content: `
Please analyze the following text and split it into tokens (words, punctuation). 
For each token, return JSON in the format:
[
  {
    "token": "...",
    "isCorrect": true/false,
    "suggestion": "...some corrected form..."
  },
  ...
]

Only return valid JSON. The array's length should match the number of tokens from the user text. 
If a token is correct, "isCorrect" = true and "suggestion" can be the same as "token".
If a token is incorrect or misspelled, "isCorrect" = false and "suggestion" should contain the corrected token. 
User text to analyze: """${userText}"""
    `,
  };

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [systemMessage, userMessage],
    temperature: 0, // keep it deterministic
  });

  // Attempt to parse the JSON in the response
  let tokens = [];
  try {
    tokens = JSON.parse(response.data.choices[0].message.content);
  } catch (err) {
    // fallback in case of malformed response
    console.error("Error parsing OpenAI JSON:", err);
    tokens = [];
  }
  return tokens;
}

module.exports = { getTokenAnalysis };
