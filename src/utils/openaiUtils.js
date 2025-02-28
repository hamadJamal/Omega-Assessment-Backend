const OpenAI = require("openai").default;
const { OPENAI_API_KEY } = require("../config");

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function getIncorrectWords(userText) {
  const systemMessage = {
    role: "system",
    content: "You are a spelling checker that returns only incorrect words as strict JSON.",
  };

  const userMessage = {
    role: "user",
    content: `
Check the spelling of this text and return only a JSON array 
of objects with the shape: { "original": "X", "suggestion": "Y" }
for each incorrect word. Exclude correct words. 
Do not include indexes. 
Do not return extra text—only the JSON array.

Text to check:
"${userText}"
`,
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, userMessage],
      temperature: 0,
    });

    const content = response.choices[0]?.message?.content || "";

    let incorrectWords = [];
    try {
      incorrectWords = JSON.parse(content);
      if (!Array.isArray(incorrectWords)) {
        throw new Error("GPT did not return an array");
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
