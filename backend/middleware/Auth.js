const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers['authorization'];

  // If no token provided
  if (!auth) {
    return res.status(403).json({ message: "Unauthorized, JWT is required" });
  }

  try {
    const decodedJWTToken = jwt.verify(auth, process.env.JWT_SECRET);

    if (!decodedJWTToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach user data to request
    req.user = decodedJWTToken;

    next();

  } catch (error) {
    return res.status(403).json({ message: "Unauthorized, JWT is wrong or expired" });
  }
};

module.exports = ensureAuthenticated;
