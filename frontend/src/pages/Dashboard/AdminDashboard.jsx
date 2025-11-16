import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../api";

const ticketRoles = ["all", "student", "instructor", "admin"];
const ticketStatuses = ["all", "open", "closed"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketsError, setTicketsError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const adminTools = [
    {
      label: "View all users (students, instructors)",
      action: () => navigate("/users"),
    },
    {
      label: "Manage courses (add, edit, delete)",
      action: () => navigate("/courses"),
    },
    { label: "Configure system settings", action: () => alert("Coming soon") },
  ];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setTicketsLoading(true);
        const res = await API.get("/tickets");
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to load tickets", err);
        setTicketsError("Failed to load tickets.");
      } finally {
        setTicketsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const ticket = tickets.find((t) => t._id === ticketId);
      if (!ticket) return;

      const res = await API.put(`/tickets/${ticketId}`, {
        subject: ticket.subject,
        message: ticket.message,
        status: newStatus,
      });

      setTickets((prev) => prev.map((t) => (t._id === ticketId ? res.data : t)));
    } catch (err) {
      console.error("Failed to update ticket status", err);
      alert("Could not update ticket status.");
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      await API.delete(`/tickets/${ticketId}`);
      setTickets((prev) => prev.filter((t) => t._id !== ticketId));
    } catch (err) {
      console.error("Failed to delete ticket", err);
      alert("Could not delete ticket.");
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const byRole = roleFilter === "all" || t.userRole === roleFilter;
    const byStatus = statusFilter === "all" || t.status === statusFilter;
    return byRole && byStatus;
  });

  return (
    <div className="page-container" style={styles.pageBackground}>
      <Navbar />

      <main style={styles.main}>
        <div style={styles.container}>
        <h2 style={styles.heading}>Admin Dashboard</h2>
        <p style={styles.subtitle}>Manage users, courses, support tickets, and platform settings.</p>
        {user?.username && (
          <p style={styles.userMeta}>
            Logged in as <strong>{user.username}</strong> ({user.role})
          </p>
        )}

        <div style={styles.toolGrid}>
          {adminTools.map((tool, idx) => (
            <div key={idx} style={styles.card}>
              <p>{tool.label}</p>
              <button style={styles.button} onClick={tool.action}>
                Manage
              </button>
            </div>
          ))}
        </div>

        {/* Admin ticket management / reports */}
        <section style={{ marginTop: "2.5rem" }}>
          <h3 style={styles.sectionTitle}>Support Tickets</h3>
          <p style={styles.sectionSubtitle}>
            View and manage tickets by user role and status.
          </p>

          <div style={styles.filtersRow}>
            <div>
              <span style={styles.filterLabel}>Role:</span>
              {ticketRoles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  style={{
                    ...styles.filterBtn,
                    ...(roleFilter === r ? styles.activeFilter : {}),
                  }}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <span style={styles.filterLabel}>Status:</span>
              {ticketStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    ...styles.filterBtn,
                    ...(statusFilter === s ? styles.activeFilter : {}),
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {ticketsLoading && <p>Loading tickets…</p>}
          {ticketsError && <p style={{ color: "red" }}>{ticketsError}</p>}

          {!ticketsLoading && !ticketsError && (
            <div style={{ overflowX: "auto", marginTop: "1rem" }}>
              <table style={styles.ticketTable}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th style={{ width: "140px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No tickets found.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((t) => (
                      <tr key={t._id}>
                        <td>{t.subject}</td>
                        <td>{t.userName}</td>
                        <td style={{ textTransform: "capitalize" }}>{t.userRole}</td>
                        <td style={{ textTransform: "capitalize" }}>{t.status}</td>
                        <td>{new Date(t.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            style={styles.smallBtn}
                            onClick={() =>
                              handleStatusChange(t._id, t.status === "open" ? "closed" : "open")
                            }
                          >
                            Mark {t.status === "open" ? "Closed" : "Open"}
                          </button>
                          <button
                            style={{ ...styles.smallBtn, background: "#e53935" }}
                            onClick={() => handleDeleteTicket(t._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
      </main>
    </div>
  );
};

const styles = {
  pageBackground: {
    backgroundColor: "#f0f4f8", // Light blue/gray background for whole page
  },
  main: {
    flex: 1,
    padding: "96px 1.5rem 2.5rem", // align with other dashboards and leave room for navbar
  },
  container: {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "0.75rem",
  },
  userMeta: {
    fontSize: "0.95rem",
    color: "#666",
    marginBottom: "1.75rem",
  },
  toolGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  sectionTitle: {
    marginTop: "2rem",
    fontSize: "1.6rem",
    fontWeight: "600",
  },
  sectionSubtitle: {
    marginTop: "0.25rem",
    color: "#555",
    marginBottom: "1rem",
  },
  filtersRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  filterLabel: {
    marginRight: "0.5rem",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  filterBtn: {
    padding: "0.35rem 0.8rem",
    marginRight: "0.35rem",
    border: "1px solid #999",
    borderRadius: "4px",
    background: "#f7f7f7",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  activeFilter: {
    background: "#007bff",
    color: "#fff",
    borderColor: "#007bff",
  },
  card: {
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#ffffff",  // White card background for contrast
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Slightly stronger shadow
    transition: "transform 0.2s ease",
    cursor: "default",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  ticketTable: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  smallBtn: {
    padding: "0.25rem 0.6rem",
    marginRight: "0.35rem",
    marginBottom: "0.25rem",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};

export default AdminDashboard;
