import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const roleLabel = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home', show: true },
    { path: '/dashboard', label: 'Dashboard', show: isLoggedIn },
    { path: '/courses', label: 'Courses', show: isLoggedIn },
    { path: '/users', label: 'Users', show: isLoggedIn }
  ];

  return (
    <motion.header 
      className={`navbar modern-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
          <FaGraduationCap className="brand-icon" />
          <span className="brand-text">LearningHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          {navItems.map(item => 
            item.show && (
              <Link 
                key={item.path}
                to={item.path} 
                className={`nav-link ${isActivePath(item.path) ? 'nav-link-active' : ''}`}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            )
          )}
          
          {isLoggedIn ? (
            <div className="user-menu">
              <div className="user-info">
                <FaUser className="user-icon" />
                <span className="user-name">{user.username || user.name || 'User'}</span>
                {roleLabel && <span className="user-role-pill">{roleLabel}</span>}
              </div>
              <button className="btn btn-glass btn-sm logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="btn-icon" />
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-primary btn-sm" onClick={handleLinkClick}>
                Login
              </Link>
              <Link to="/register" className="btn btn-glass btn-sm" onClick={handleLinkClick}>
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-content">
              {navItems.map(item => 
                item.show && (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`mobile-nav-link ${isActivePath(item.path) ? 'mobile-nav-link-active' : ''}`}
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                )
              )}
              
              {isLoggedIn ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <FaUser className="user-icon" />
                    <span>{user.username || user.name || 'User'}</span>
                    {roleLabel && <span className="user-role-pill">{roleLabel}</span>}
                  </div>
                  <button className="btn btn-danger btn-full mobile-logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt className="btn-icon" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link to="/login" className="btn btn-primary btn-full" onClick={handleLinkClick}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-secondary btn-full" onClick={handleLinkClick}>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
