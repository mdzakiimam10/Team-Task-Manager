const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "No token" });
    }

    // Bearer token split
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    // ✅ use .env secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check role
    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};