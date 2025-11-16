const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/authController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

// Auth (public)
router.post("/register", ctrl.register);
router.post("/login",    ctrl.login);

// ► User management (admin-only)
router.get   ("/users",     authenticate, authorizeRoles("admin"), ctrl.getUsers);
router.delete("/users/:id", authenticate, authorizeRoles("admin"), ctrl.deleteUser);

module.exports = router;
