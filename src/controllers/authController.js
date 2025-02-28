const authService = require("../services/authService");

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    if (!result.success) {
      return res.status(401).json(result);
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
}

function logout(req, res) {
  return res.json({
    success: true,
    data: { message: "Logged out successfully" },
  });
}

module.exports = {
  login,
  logout,
};
