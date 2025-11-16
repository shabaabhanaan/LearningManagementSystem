import React, { useState } from "react";
import API from "../api"; // axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CourseForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    instructor: "",
    thumbnailUrl: "",
    contentUrl: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/courses", form)
      .then(() => {
        alert("✅ Course added successfully!");
        navigate("/courses");
      })
      .catch((err) => {
        console.error("Error adding course:", err);
        alert("❌ Failed to add course.");
      });
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="auth-container">
        <div className="card auth-card">
          <div className="card-header text-center">
            <h2 className="card-title">Add New Course</h2>
            <p className="card-subtitle">Create a new course for your learners</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g. Introduction to React"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Course Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-input"
                  placeholder="Short overview of the course"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Duration (hours)</label>
                <input
                  type="number"
                  name="duration"
                  className="form-input"
                  placeholder="e.g. 10"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instructor Name</label>
                <input
                  type="text"
                  name="instructor"
                  className="form-input"
                  placeholder="Instructor full name"
                  value={form.instructor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Thumbnail Image URL</label>
                <input
                  type="text"
                  name="thumbnailUrl"
                  className="form-input"
                  placeholder="Optional image to represent the course"
                  value={form.thumbnailUrl}
                  onChange={handleChange}
                />
                <p className="form-help">Use a landscape image (e.g. 1280x720) for best results.</p>
              </div>

              <div className="form-group">
                <label className="form-label">Content / Slides URL</label>
                <input
                  type="text"
                  name="contentUrl"
                  className="form-input"
                  placeholder="Link to slides, PDF, or docs (optional)"
                  value={form.contentUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Video URL</label>
                <input
                  type="text"
                  name="videoUrl"
                  className="form-input"
                  placeholder="YouTube or other video link (optional)"
                  value={form.videoUrl}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg">
                Add Course
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-full"
                style={{ marginTop: "var(--space-3)" }}
                onClick={() => navigate("/courses")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
