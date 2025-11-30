const jwt = require("jsonwebtoken");

const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

function adminMiddleware(req, res, next) {
  try {
    // Standard way to send token  Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET_ADMIN);

    // Attach user ID to the request object
    req.userId = decoded.id;

    next(); // Continue to next handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  adminMiddleware,
};
