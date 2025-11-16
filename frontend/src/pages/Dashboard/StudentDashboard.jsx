import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../api"; // <- axios instance
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [view, setView] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [editingProfile, setEditingProfile] = useState(false);

  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ subject: "", message: "" });
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editTicket, setEditTicket] = useState({ subject: "", message: "" });

  const ticketFormRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTickets = await API.get("/tickets");
        setTickets(resTickets.data);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }

      try {
        const resCourses = await API.get("/courses");
        setCourses(resCourses.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setCoursesError("Unable to load courses right now.");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchData();

    const user = JSON.parse(localStorage.getItem("user")) || {};
    setProfile({ username: user.username || "", email: user.email || "" });
  }, []);

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const saveProfile = () => {
    const existingUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = {
      ...existingUser,
      username: profile.username,
      email: profile.email,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditingProfile(false);
    alert("Profile updated!");
  };

  const addTicket = async () => {
    if (!newTicket.subject || !newTicket.message) {
      alert("Please fill in both subject and message.");
      return;
    }

    try {
      const res = await API.post("/tickets", newTicket);
      setTickets([res.data, ...tickets]);
      setNewTicket({ subject: "", message: "" });
      alert("Ticket submitted!");
    } catch (err) {
      console.error("Failed to add ticket", err);
    }
  };

  const startEditing = (ticket) => {
    setEditingTicketId(ticket._id);
    setEditTicket({ subject: ticket.subject, message: ticket.message });
  };

  const saveUpdatedTicket = async () => {
    if (!editTicket.subject || !editTicket.message) {
      alert("Please fill in both subject and message.");
      return;
    }

    try {
      const res = await API.put(`/tickets/${editingTicketId}`, editTicket);
      setTickets(tickets.map((t) => (t._id === editingTicketId ? res.data : t)));
      setEditingTicketId(null);
      setEditTicket({ subject: "", message: "" });
      alert("Ticket updated!");
    } catch (err) {
      console.error("Failed to update ticket", err);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await API.delete(`/tickets/${id}`);
      setTickets(tickets.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete ticket", err);
    }
  };

  // Scroll and switch to support view when clicking New Ticket
  const handleNewTicketClick = () => {
    setView("support");
    setTimeout(() => {
      if (ticketFormRef.current) {
        ticketFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Student Dashboard</h2>
            <p className="dashboard-subtitle">Access your courses, profile, and support</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-tabs">
            <button
              className={`dashboard-tab ${view === "courses" ? "active" : ""}`}
              onClick={() => setView("courses")}
            >
              Courses
            </button>
            <button
              className={`dashboard-tab ${view === "profile" ? "active" : ""}`}
              onClick={() => setView("profile")}
            >
              Profile
            </button>
            <button
              className={`dashboard-tab ${view === "support" ? "active" : ""}`}
              onClick={() => setView("support")}
            >
              Contact Support
            </button>
            <button className="dashboard-new-ticket" onClick={handleNewTicketClick}>
              New Ticket
            </button>
          </div>

          {/* Courses */}
          {view === "courses" && (
            <section className="dashboard-section">
              <h3 className="section-title">Your Courses</h3>
              {coursesLoading ? (
                <p className="section-text">Loading courses…</p>
              ) : coursesError ? (
                <p className="section-text section-text-error">{coursesError}</p>
              ) : courses.length === 0 ? (
                <div className="student-empty-state">
                  <p className="section-text">
                    You’re not enrolled in any courses yet.
                  </p>
                  <p className="section-text">
                    Browse available courses or request a new course from support.
                  </p>
                  <div className="student-empty-actions">
                    <Link to="/courses" className="btn btn-primary">
                      Browse courses
                    </Link>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setView("support")}
                    >
                      Request a course
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="course-list">
                  {courses.map((course) => (
                    <li key={course._id || course.id} className="course-card">
                      <div className="course-card-header">
                        <h4 className="course-title">{course.title}</h4>
                        {course.duration && (
                          <span className="course-meta">{course.duration} hours</span>
                        )}
                      </div>
                      {course.instructor && (
                        <div className="course-meta">Instructor: {course.instructor}</div>
                      )}
                      {course.thumbnailUrl && (
                        <div style={{ marginTop: "0.5rem" }}>
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            style={{ maxWidth: "100%", borderRadius: "12px" }}
                          />
                        </div>
                      )}
                      {course.description && (
                        <p className="course-description">{course.description}</p>
                      )}
                      {(course.contentUrl || course.videoUrl) && (
                        <div style={{ marginTop: "0.5rem" }}>
                          {course.contentUrl && (
                            <a
                              href={course.contentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="course-meta"
                            >
                              View Content
                            </a>
                          )}
                          {course.contentUrl && course.videoUrl && <span>  b7 </span>}
                          {course.videoUrl && (
                            <a
                              href={course.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="course-meta"
                            >
                              Watch Video
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Profile */}
          {view === "profile" && (
            <section className="dashboard-section">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Your Profile</h3>
                  <p className="card-subtitle">Update your personal details</p>
                </div>
                <div className="card-body">
                  {!editingProfile ? (
                    <>
                      <p className="profile-item">
                        <strong>Username:</strong> {profile.username}
                      </p>
                      <p className="profile-item">
                        <strong>Email:</strong> {profile.email}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => setEditingProfile(true)}
                      >
                        Edit Profile
                      </button>
                    </>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveProfile();
                      }}
                      className="profile-form"
                    >
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={profile.username}
                          onChange={handleProfileChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="profile-actions">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setEditingProfile(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Support */}
          {view === "support" && (
            <section className="dashboard-section">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Contact Support</h3>
                  <p className="card-subtitle">
                    If you're facing issues, submit a support ticket below.
                  </p>
                </div>
                <div className="card-body">
                  <div className="support-form" ref={ticketFormRef}>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={newTicket.subject}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, subject: e.target.value })
                      }
                      className="form-input"
                    />
                    <textarea
                      placeholder="Describe your issue..."
                      value={newTicket.message}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, message: e.target.value })
                      }
                      rows={4}
                      className="form-input"
                      style={{ resize: "vertical" }}
                    />
                    <button onClick={addTicket} className="btn btn-primary">
                      Submit Ticket
                    </button>
                  </div>

                  <h4 className="tickets-title">Your Tickets</h4>
                  {tickets.length === 0 ? (
                    <p className="section-text">No support tickets.</p>
                  ) : (
                    <ul className="ticket-list">
                      {tickets.map((ticket) => (
                        <li key={ticket._id} className="ticket-card">
                          {editingTicketId === ticket._id ? (
                            <>
                              <input
                                type="text"
                                value={editTicket.subject}
                                onChange={(e) =>
                                  setEditTicket({
                                    ...editTicket,
                                    subject: e.target.value,
                                  })
                                }
                                className="form-input"
                              />
                              <textarea
                                value={editTicket.message}
                                onChange={(e) =>
                                  setEditTicket({
                                    ...editTicket,
                                    message: e.target.value,
                                  })
                                }
                                rows={3}
                                className="form-input"
                                style={{ resize: "vertical" }}
                              />
                              <div className="ticket-actions">
                                <button onClick={saveUpdatedTicket} className="btn btn-primary">
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingTicketId(null)}
                                  className="btn btn-secondary"
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="ticket-header">
                                <h5>{ticket.subject}</h5>
                                <span className={`ticket-status ticket-status-${ticket.status}`}>
                                  {ticket.status}
                                </span>
                              </div>
                              <p className="ticket-message">{ticket.message}</p>
                              <div className="ticket-actions">
                                <button
                                  onClick={() => startEditing(ticket)}
                                  className="btn btn-secondary"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTicket(ticket._id)}
                                  className="btn btn-danger"
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

// Inline styles replaced by StudentDashboard.css for a consistent modern UI
const styles = {
  wrapper: {
    padding: "2rem 1rem",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily:
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2c3e50",
  },
  pageTitle: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#34495e",
    borderBottom: "3px solid #2980b9",
    paddingBottom: "0.5rem",
  },
  nav: {
    marginBottom: "2rem",
    display: "flex",
    gap: "0.8rem",
    flexWrap: "wrap",
  },
  navButton: {
    cursor: "pointer",
    backgroundColor: "#ecf0f1",
    border: "1.5px solid #bdc3c7",
    padding: "0.6rem 1.3rem",
    fontSize: "1.05rem",
    borderRadius: "8px",
    color: "#34495e",
    fontWeight: "600",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 4px rgb(0 0 0 / 0.1)",
  },
  navButtonActive: {
    backgroundColor: "#2980b9",
    color: "white",
    borderColor: "#2980b9",
    boxShadow: "0 4px 8px rgb(41 128 185 / 0.4)",
  },
  newTicketButton: {
    marginLeft: "auto",
    cursor: "pointer",
    backgroundColor: "#27ae60",
    border: "none",
    padding: "0.6rem 1.4rem",
    fontSize: "1.05rem",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "700",
    boxShadow: "0 4px 8px rgb(39 174 96 / 0.4)",
    transition: "background-color 0.3s ease",
  },
  sectionTitle: {
    fontSize: "1.9rem",
    marginBottom: "1.2rem",
    color: "#34495e",
    fontWeight: "700",
  },
  infoText: {
    fontSize: "1.1rem",
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  courseList: { listStyleType: "none", paddingLeft: 0 },
  courseItem: {
    marginBottom: "1.2rem",
    backgroundColor: "#fff",
    padding: "1.2rem",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    color: "#2c3e50",
  },
  progressBarBackground: {
    backgroundColor: "#dfe6e9",
    borderRadius: "8px",
    width: "100%",
    height: "14px",
    marginTop: "8px",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#27ae60",
    borderRadius: "8px",
  },
  profileSection: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
    color: "#2c3e50",
  },
  profileItem: { fontSize: "1.15rem", marginBottom: "1rem" },
  editButton: {
    padding: "0.55rem 1.2rem",
    backgroundColor: "#2980b9",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 2px 6px rgba(41,128,185,0.7)",
    transition: "background-color 0.3s ease",
  },
  form: { display: "flex", flexDirection: "column", gap: "1.2rem" },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#34495e",
  },
  input: {
    padding: "0.6rem",
    fontSize: "1.05rem",
    borderRadius: "8px",
    border: "1.5px solid #bdc3c7",
    marginTop: "0.4rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  formButtons: { display: "flex", gap: "1.2rem" },
  saveButton: {
    padding: "0.65rem 1.3rem",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 3px 8px rgba(39,174,96,0.7)",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    padding: "0.65rem 1.3rem",
    backgroundColor: "#7f8c8d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 3px 8px rgba(127,140,141,0.7)",
    transition: "background-color 0.3s ease",
  },
  supportForm: {
    maxWidth: "520px",
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
  },
  submitButton: {
    marginTop: "0.6rem",
    padding: "0.7rem",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0 4px 8px rgba(41,128,185,0.7)",
    transition: "background-color 0.3s ease",
  },
  ticketList: { listStyleType: "none", paddingLeft: 0 },
  ticketItem: {
    backgroundColor: "#fff",
    padding: "1.2rem",
    marginBottom: "1.2rem",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
    color: "#2c3e50",
  },
  deleteTicketButton: {
    marginTop: "0.5rem",
    backgroundColor: "#c0392b",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
};

export default StudentDashboard;
