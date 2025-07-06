const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "open" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
