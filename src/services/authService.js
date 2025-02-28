const { signToken } = require("../utils/tokenUtils");

// Dummy user for demonstration:
const DUMMY_USER = {
  username: "admin",
  password: "1234",
};

async function login(username, password) {
  if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
    const token = signToken({ username });
    return {
      success: true,
      data: { token },
      error: null,
    };
  }
  return {
    success: false,
    data: null,
    error: { message: "Invalid credentials" },
  };
}

module.exports = {
  login,
};
