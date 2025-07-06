const Instructor = require("../models/Instructor");

// Create Instructor
exports.createInstructor = async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    const savedInstructor = await instructor.save();
    res.status(201).json(savedInstructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Instructors
exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().populate("coursesTaught");
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Instructor By ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id).populate("coursesTaught");
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Instructor
exports.updateInstructor = async (req, res) => {
  try {
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInstructor) return res.status(404).json({ message: "Instructor not found" });
    res.json(updatedInstructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Instructor
exports.deleteInstructor = async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!deletedInstructor) return res.status(404).json({ message: "Instructor not found" });
    res.json({ message: "Instructor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
