import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaBookOpen, FaChartLine, FaRocket, FaStar } from "react-icons/fa";
import "./Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api";

const Home = () => {
  const [featuredCourse, setFeaturedCourse] = useState(null);

  useEffect(() => {
    API.get("/courses")
      .then((res) => {
        const withMedia = res.data.find(
          (c) => c.thumbnailUrl || c.videoUrl || c.contentUrl
        );
        if (withMedia) setFeaturedCourse(withMedia);
      })
      .catch((err) => console.error("Failed to load featured course", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: <FaGraduationCap />,
      title: "Smart Learning",
      description: "Advanced learning management with AI-powered recommendations",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: <FaUsers />,
      title: "User Management",
      description: "Comprehensive user management with role-based access control",
      image:
        "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: <FaBookOpen />,
      title: "Course Library",
      description: "Extensive course library with interactive content and assessments",
      image:
        "https://images.pexels.com/photos/5905719/pexels-photo-5905719.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics",
      description: "Detailed analytics and progress tracking for better insights",
      image:
        "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <div className="page-container">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section modern-hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <FaStar className="badge-icon" />
            <span>Most Advanced LMS Platform</span>
          </motion.div>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            Transform Learning with
            <span className="gradient-text"> LearningHub</span>
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Empower education with our cutting-edge learning management system. 
            Create, manage, and deliver exceptional learning experiences with ease.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <Link to="/dashboard" className="btn btn-primary btn-lg btn-glow">
              <FaRocket className="btn-icon" />
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg btn-glass">
              Sign In
            </Link>
          </motion.div>
          
          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose LearningHub?</h2>
            <p>Discover the powerful features that make learning management effortless</p>
          </motion.div>
          
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "var(--shadow-xl)",
                  transition: { duration: 0.3 }
                }}
              >
                {feature.image && (
                  <div className="feature-image-wrap">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="feature-image"
                    />
                  </div>
                )}
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured media from a real course */}
      {featuredCourse && (
        <section className="features-section">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Featured Course</h2>
              <p>
                This course showcases how LearningHub supports rich media content,
                including images, documents, and videos.
              </p>
            </motion.div>

            <div className="features-grid">
              <div className="feature-card">
                {featuredCourse.thumbnailUrl && (
                  <div style={{ marginBottom: "1rem" }}>
                    <img
                      src={featuredCourse.thumbnailUrl}
                      alt={featuredCourse.title}
                      style={{ width: "100%", borderRadius: "12px" }}
                    />
                  </div>
                )}
                <h3>{featuredCourse.title}</h3>
                {featuredCourse.description && (
                  <p style={{ marginBottom: "0.75rem" }}>
                    {featuredCourse.description}
                  </p>
                )}
                <p className="course-meta">
                  {featuredCourse.duration && `${featuredCourse.duration} hours`}
                  {featuredCourse.duration && featuredCourse.instructor && " · "}
                  {featuredCourse.instructor && `Instructor: ${featuredCourse.instructor}`}
                </p>
                {(featuredCourse.contentUrl || featuredCourse.videoUrl) && (
                  <p style={{ marginTop: "0.75rem" }}>
                    {featuredCourse.contentUrl && (
                      <a
                        href={featuredCourse.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Course Content
                      </a>
                    )}
                    {featuredCourse.contentUrl && featuredCourse.videoUrl && <span> · </span>}
                    {featuredCourse.videoUrl && (
                      <a
                        href={featuredCourse.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Course Video
                      </a>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;
