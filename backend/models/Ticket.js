const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "open" },
    // Link each ticket to the user who created it so tasks are per-user
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
