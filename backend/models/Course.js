const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    duration: Number,
    instructor: String,
    // Optional media fields for richer course content
    thumbnailUrl: String, // image representing the course
    contentUrl: String,   // link to slides / documents
    videoUrl: String,     // link to hosted video (e.g., YouTube)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
