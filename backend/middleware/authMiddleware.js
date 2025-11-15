// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // token can come from "x-auth-token" or "Authorization: Bearer <token>"
  const token =
    req.header("x-auth-token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // user id from token
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
