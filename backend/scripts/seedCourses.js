const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("../models/Course");

dotenv.config();

const sampleCourses = [
  {
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern web pages.",
    duration: 10,
    instructor: "Admin Instructor",
    thumbnailUrl:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    contentUrl: "https://developer.mozilla.org/en-US/docs/Learn",
    videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
  },
  {
    title: "React Fundamentals",
    description: "Component-based development, hooks, state management, and routing in React.",
    duration: 12,
    instructor: "Admin Instructor",
    thumbnailUrl:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    contentUrl: "https://react.dev/learn",
    videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
  },
  {
    title: "Data Structures & Algorithms Basics",
    description: "Big-O notation, arrays, linked lists, stacks, queues, and common algorithms.",
    duration: 15,
    instructor: "CS Instructor",
    thumbnailUrl:
      "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800",
    contentUrl: "https://www.geeksforgeeks.org/data-structures/",
    videoUrl: "https://www.youtube.com/watch?v=8hly31xKli0",
  },
];

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

    console.log("Connected to MongoDB. Clearing existing courses...");
    await Course.deleteMany({});

    console.log("Inserting sample courses...");
    await Course.insertMany(sampleCourses);

    console.log("✅ Sample courses inserted successfully.");
  } catch (err) {
    console.error("Error seeding courses:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
