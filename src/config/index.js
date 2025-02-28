require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || "yoursecretkey",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
