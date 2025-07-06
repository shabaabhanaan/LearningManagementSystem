const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// Create Ticket
router.post("/", async (req, res) => {
  try {
    const { subject, message } = req.body;
    const ticket = await Ticket.create({ subject, message });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Tickets
router.get("/", async (_, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Ticket
router.put("/:id", async (req, res) => {
  try {
    const { subject, message } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { subject, message },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Ticket
router.delete("/:id", async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
