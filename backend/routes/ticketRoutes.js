const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { authenticate } = require("../middleware/authMiddleware");

// All ticket routes require authentication
router.use(authenticate);

// Create Ticket - associate with the authenticated user
router.post("/", async (req, res) => {
  try {
    const { subject, message } = req.body;
    const { id, username, role } = req.user || {};

    if (!id || !username || !role) {
      return res.status(400).json({ error: "Invalid user context for ticket" });
    }

    const ticket = await Ticket.create({
      subject,
      message,
      userId: id,
      userName: username,
      userRole: role,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tickets
// - Admins see all tickets
// - Other roles see only their own tickets
router.get("/", async (req, res) => {
  try {
    const { id, role } = req.user || {};
    const query = role === "admin" ? {} : { userId: id };

    const tickets = await Ticket.find(query).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Ticket
// - Admins can update any ticket
// - Other roles can only update their own tickets
router.put("/:id", async (req, res) => {
  try {
    const { subject, message, status } = req.body;
    const { id: userId, role } = req.user || {};

    const filter = role === "admin" ? { _id: req.params.id } : { _id: req.params.id, userId };

    const update = { subject, message };
    if (status) {
      update.status = status;
    }

    const ticket = await Ticket.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found or access denied" });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Ticket
// - Admins can delete any ticket
// - Other roles can only delete their own tickets
router.delete("/:id", async (req, res) => {
  try {
    const { id: userId, role } = req.user || {};

    const filter = role === "admin" ? { _id: req.params.id } : { _id: req.params.id, userId };

    const deleted = await Ticket.findOneAndDelete(filter);

    if (!deleted) {
      return res.status(404).json({ error: "Ticket not found or access denied" });
    }

    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
