import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import InstructorDashboard from "./InstructorDashboard";
import StudentDashboard from "./StudentDashboard";

const DashboardRouter = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (!userJSON) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userJSON);
    if (!user.role) {
      navigate("/login");
      return;
    }
    setRole(user.role);
  }, [navigate]);

  if (!role) return <p>Loading dashboard...</p>;

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "instructor":
      return <InstructorDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return <p>Unknown role</p>;
  }
};

export default DashboardRouter;
