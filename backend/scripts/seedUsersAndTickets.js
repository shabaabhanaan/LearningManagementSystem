const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Ticket = require("../models/Ticket");

dotenv.config();

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB.");

    // ---- Seed Users ----
    console.log("Clearing existing users...");
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("Password123!", 10);

    const users = await User.insertMany([
      {
        username: "admin",
        email: "admin@example.com",
        password: passwordHash,
        role: "admin",
      },
      {
        username: "instructor1",
        email: "instructor1@example.com",
        password: passwordHash,
        role: "instructor",
      },
      {
        username: "student1",
        email: "student1@example.com",
        password: passwordHash,
        role: "student",
      },
      {
        username: "student2",
        email: "student2@example.com",
        password: passwordHash,
        role: "student",
      },
    ]);

    console.log("✅ Sample users inserted.");

    const adminUser = users.find((u) => u.role === "admin");
    const studentUser = users.find((u) => u.role === "student");

    // ---- Seed Tickets ----
    console.log("Clearing existing tickets...");
    await Ticket.deleteMany({});

    const ticketSamples = [
      {
        subject: "Issue accessing course content",
        message: "I cannot open the PDF for the React Fundamentals course.",
        status: "open",
        userId: studentUser._id.toString(),
        userName: studentUser.username,
        userRole: studentUser.role,
      },
      {
        subject: "Request new course: Advanced Node.js",
        message: "Please add an advanced Node.js and microservices course.",
        status: "open",
        userId: studentUser._id.toString(),
        userName: studentUser.username,
        userRole: studentUser.role,
      },
      {
        subject: "Bulk user import completed",
        message: "Imported 120 new students from CSV.",
        status: "closed",
        userId: adminUser._id.toString(),
        userName: adminUser.username,
        userRole: adminUser.role,
      },
    ];

    await Ticket.insertMany(ticketSamples);
    console.log("✅ Sample tickets inserted.");

    console.log("Seeding complete.");
  } catch (err) {
    console.error("Error seeding users/tickets:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
