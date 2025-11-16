import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../api";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses")
      .then((res) => {
        if (user?.username) {
          setCourses(res.data.filter((c) => c.instructor === user.username));
        } else {
          setCourses(res.data);
        }
      })
      .catch((err) => console.error("Failed to load instructor courses", err));
  }, []);

  return (
    <div style={styles.pageBackground}>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.heading}>Instructor Dashboard</h1>
        <p style={styles.subtitle}>
          Manage your courses, assignments, and track student progress.
        </p>
        {user?.username && (
          <p style={styles.userMeta}>
            Logged in as <strong>{user.username}</strong> ({user.role})
          </p>
        )}

        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, backgroundColor: "#28a745" }}
            onClick={() => navigate("/add-course")}
          >
            + Add New Course
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "#007bff" }}
            onClick={() => navigate("/courses")}
          >
            View All Courses
          </button>
        </div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
          <ul style={styles.actionList}>
            <li>Create new course content</li>
            <li>Review student assignments</li>
            <li>Track and analyze student progress</li>
          </ul>
        </section>

        <section style={{ ...styles.section, marginTop: "1.5rem" }}>
          <h2 style={styles.sectionTitle}>My Courses</h2>
          {courses.length === 0 ? (
            <p style={styles.emptyText}>
              You haven't created any courses yet. Use "Add New Course" to get started.
            </p>
          ) : (
            <div style={styles.courseGrid}>
              {courses.map((course) => (
                <div key={course._id} style={styles.courseCard}>
                  {course.thumbnailUrl && (
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      style={styles.courseImage}
                    />
                  )}
                  <h3 style={styles.courseTitle}>{course.title}</h3>
                  {course.description && (
                    <p style={styles.courseDescription}>{course.description}</p>
                  )}
                  <p style={styles.courseMeta}>
                    {course.duration && `${course.duration} hours`}
                    {course.duration && course.instructor && " · "}
                    {course.instructor && `Instructor: ${course.instructor}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    paddingBottom: "3rem",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#222",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "0.75rem",
  },
  userMeta: {
    fontSize: "0.95rem",
    color: "#666",
    marginBottom: "1.75rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  section: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#333",
  },
  actionList: {
    listStyleType: "disc",
    paddingLeft: "1.5rem",
    fontSize: "1rem",
    color: "#444",
    lineHeight: "1.6",
  },
  emptyText: {
    color: "#666",
  },
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.25rem",
  },
  courseCard: {
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    padding: "1rem",
    backgroundColor: "#f9fafb",
  },
  courseImage: {
    width: "100%",
    borderRadius: "6px",
    marginBottom: "0.5rem",
  },
  courseTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "0.4rem",
  },
  courseDescription: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "0.4rem",
  },
  courseMeta: {
    fontSize: "0.85rem",
    color: "#777",
  },
};

export default InstructorDashboard;
