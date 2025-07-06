const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/authController");

// Auth
router.post("/register", ctrl.register);
router.post("/login",    ctrl.login);

// ► User management
router.get   ("/users",     ctrl.getUsers);
router.delete("/users/:id", ctrl.deleteUser);

module.exports = router;
