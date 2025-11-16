import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import our styling system
import "./App.css";
import "./components.css";

import Home from "./pages/Home";
import DashboardRouter from "./pages/Dashboard/DashboardRouter";
import CourseList from "./components/CourseList";
import CourseForm from "./components/CourseForm";
import Register from "./components/Register";
import Login from "./components/Login";
import UserList from "./components/UserList"; // ✅ add this line

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard and nested routes */}
          <Route path="/dashboard/*" element={<DashboardRouter />} />

          {/* Course management */}
          <Route path="/courses" element={<CourseList />} />
          <Route path="/add-course" element={<CourseForm />} />

          {/* User management */}
          <Route path="/users" element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
