const jwt = require("jsonwebtoken");

const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

function adminMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET_ADMIN);

    req.adminId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  adminMiddleware,
};
