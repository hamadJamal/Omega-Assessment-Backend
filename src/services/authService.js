const authService = require("../services/authService");

exports.login = async (req, res) => {
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
};

exports.logout = (req, res) => {
  // For simple JWT-based auth, the front-end can just remove the token from storage.
  // Optionally you could blacklist the token here, but minimal approach:
  return res.json({
    success: true,
    data: { message: "Logged out successfully" },
  });
};
