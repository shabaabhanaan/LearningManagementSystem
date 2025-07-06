const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Create
router.post("/", courseController.createCourse);

// Read All
router.get("/", courseController.getCourses);

// Read One
router.get("/:id", courseController.getCourseById);

// Update
router.put("/:id", courseController.updateCourse);

// Delete
router.delete("/:id", courseController.deleteCourse);

module.exports = router;


