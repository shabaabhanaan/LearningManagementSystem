import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";  // <-- import Navbar here
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",  // default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/auth/register", form)
      .then(() => {
        alert("Registration successful!");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Failed to register. Try again.");
      });
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="auth-container">
        <div className="card auth-card">
          <div className="card-header text-center">
            <h2 className="card-title">Create Account</h2>
            <p className="card-subtitle">Join our learning community</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <p className="form-help" style={{ marginBottom: "var(--space-4)" }}>
                  Choose your role to get the right dashboard:
                  <br />
                  <strong>Student</strong> – take courses and open support tickets.
                  <br />
                  <strong>Instructor</strong> – create and manage courses.
                  <br />
                  <strong>Admin</strong> – manage users and all tickets.
                </p>
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <button type="submit" className="btn btn-primary btn-full btn-lg">
                Create Account
              </button>
            </form>
          </div>
          <div className="card-footer text-center">
            <p className="text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-weight-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
