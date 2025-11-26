const jwt = require("jsonwebtoken");


const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    return res.status(403).json({ message: "Unauthorized, JWT is required" });
  }

  try {
    const decodedJWToken = jwt.verify(auth, process.env.JWT_SECRET);

    req.user = decodedJWToken;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized, JWT is wrong or expired" });
  }
}


module.exports = ensureAuthenticated;