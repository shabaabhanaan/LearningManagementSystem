const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role:     { type: String, required: true, enum: ["admin", "instructor", "student"], default: "student" }, // add this
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
