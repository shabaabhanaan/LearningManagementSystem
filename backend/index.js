// Load environment variables from .env
require("dotenv").config();

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app  = express();
const PORT = process.env.PORT || 5000;

/* ─────────────  Global Middleware  ───────────── */
app.use(cors());
app.use(express.json());          // Parses incoming JSON

/* ─────────────  MongoDB Connection  ───────────── */
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);              // Exit if DB connection fails
  }
}
connectDB();

/* ─────────────  Route Imports  ───────────── */
const courseRoutes     = require("./routes/courseRoutes");
const studentRoutes    = require("./routes/studentRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const authRoutes       = require("./routes/authRoutes");

// NEW: support‑ticket CRUD
const ticketRoutes     = require("./routes/ticketRoutes");

/* ─────────────  Route Registration  ───────────── */
app.use("/api/courses",     courseRoutes);
app.use("/api/students",    studentRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/auth",        authRoutes);
app.use("/api/tickets",     ticketRoutes);   // ← NEW

/* ─────────────  Root Route  ───────────── */
app.get("/", (_, res) => res.send("🚀 API is running..."));

/* ─────────────  404 Fallback  ───────────── */
app.use((_, res) => res.status(404).json({ message: "Route not found" }));

/* ─────────────  Start Server  ───────────── */
app.listen(PORT, () =>
  console.log(`🌐 Server running at http://localhost:${PORT}`)
);
