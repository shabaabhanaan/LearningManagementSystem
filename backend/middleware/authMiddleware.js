const jwt = require("jsonwebtoken");

/**
 * Authenticate requests using JWT in the Authorization header.
 *
 * Expected header format:
 *   Authorization: Bearer <token>
 */
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Authorize specific roles (e.g., admin only routes).
 */
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient privileges" });
    }
    next();
  };
};
