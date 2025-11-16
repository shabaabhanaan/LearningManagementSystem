import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";  // <-- Import Navbar here
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    API.post("/auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="auth-container">
        <div className="card auth-card">
          <div className="card-header text-center login-header">
            <div className="login-header-icon">🎓</div>
            <h2 className="card-title">Welcome back</h2>
            <p className="card-subtitle">Sign in to continue to LearningHub</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <p className="form-help login-intro">
                  Use your email and password to sign in. Your role
                  (student, instructor, or admin) automatically routes you to
                  the correct dashboard.
                </p>
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
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login-meta-row">
                <label className="login-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="login-link-button"
                  onClick={() => alert("Password reset flow not implemented yet.")}
                >
                  Forgot password?
                </button>
              </div>
              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}
              
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading"></span>
                    <span style={{ marginLeft: 'var(--space-2)' }}>Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
          <div className="card-footer text-center">
            <p className="text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-weight-medium">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
