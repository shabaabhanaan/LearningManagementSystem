const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

// All course routes require authentication
router.use(authenticate);

// Create (instructors and admins only)
router.post("/", authorizeRoles("instructor", "admin"), courseController.createCourse);

// Read All (any authenticated user)
router.get("/", courseController.getCourses);

// Read One (any authenticated user)
router.get("/:id", courseController.getCourseById);

// Update (instructors and admins only)
router.put("/:id", authorizeRoles("instructor", "admin"), courseController.updateCourse);

// Delete (instructors and admins only)
router.delete("/:id", authorizeRoles("instructor", "admin"), courseController.deleteCourse);

module.exports = router;
