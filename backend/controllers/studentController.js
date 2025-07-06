const Student = require("../models/Student");

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("enrolledCourses");
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Student By ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("enrolledCourses");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
