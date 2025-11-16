// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import API from "../api";               // adjust path if different
import Navbar from "./Navbar";          // optional—remove if not needed

const roles = ["all", "student", "instructor", "admin"];

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  /* ───────────────── Fetch users on mount ───────────────── */
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    API.get("/auth/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load users.");
      })
      .finally(() => setLoading(false));
  };

  /* ───────────────── Delete user ───────────────── */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this user?")) return;

    API.delete(`/auth/users/${id}`)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete user.");
      });
  };

  const displayedUsers =
    filter === "all" ? users : users.filter((u) => u.role === filter);

  return (
    <div className="page-container">
      {/* If you already have a Navbar in the parent, remove this */}
      <Navbar showLogout />

      <main style={styles.main}>
        <div style={styles.container}>
        <h2 style={styles.title}>Users</h2>

        {/* Filter buttons */}
        <div style={styles.filterRow}>
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              style={{
                ...styles.filterBtn,
                ...(filter === r ? styles.activeFilter : {}),
              }}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Content states */}
        {loading && <p>Loading users…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style={{ width: "90px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  displayedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td style={{ textTransform: "capitalize" }}>{user.role}</td>
                      <td>
                        <button
                          style={styles.delBtn}
                          onClick={() => handleDelete(user._id)}
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
        </div>
      </main>
    </div>
  );
};

/* ───────────────── Styles ───────────────── */
const styles = {
  main: {
    flex: 1,
    padding: "96px 1.5rem 2.5rem", // leave room for fixed navbar and add bottom space
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  filterRow: {
    marginBottom: "1rem",
    display: "inline-flex",
    gap: "0.5rem",
    borderRadius: "999px",
    padding: "0.25rem",
    background: "#eef2f7",
  },
  filterBtn: {
    padding: "0.35rem 0.9rem",
    border: "none",
    borderRadius: "999px",
    background: "transparent",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#555",
  },
  activeFilter: {
    background: "#007bff",
    color: "#fff",
  },
  tableWrapper: {
    overflowX: "auto",
    marginTop: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  delBtn: {
    padding: "0.25rem 0.6rem",
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UserList;
