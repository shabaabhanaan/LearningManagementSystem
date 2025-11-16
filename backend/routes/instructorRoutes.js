const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const { authenticate } = require("../middleware/authMiddleware");

// All instructor routes require authentication
router.use(authenticate);

router.post("/", instructorController.createInstructor);
router.get("/", instructorController.getInstructors);
router.get("/:id", instructorController.getInstructorById);
router.put("/:id", instructorController.updateInstructor);
router.delete("/:id", instructorController.deleteInstructor);

module.exports = router;
