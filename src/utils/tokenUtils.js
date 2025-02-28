const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function signToken(payload) {
  // Expires in 1 hour
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  signToken,
  verifyToken,
};
