const express = require("express");
const router = express.Router();
const TrainingRegistration = require("../models/TrainingRegistration");
const Training = require("../models/Training");

// Twilio setup
const accountSid = "AC6828a61136cd09b9f3f59d054850d4d2";
const authToken = "1f8ad7248a8538f43d08a3f6c1e461d7"; // Replace with actual token
const client = require("twilio")(accountSid, authToken);

// Admin WhatsApp number (joined sandbox)
const adminPhone = "whatsapp:+916366076182";

// POST /api/training-registrations
router.post("/", async (req, res) => {
  try {
    const { name, phone, trainingId } = req.body;

    // Fetch training details
    const training = await Training.findById(trainingId);
    if (!training) {
      return res.status(404).json({ success: false, message: "Training not found" });
    }

    // Save registration
    const registration = new TrainingRegistration({
      name,
      phone,
      trainingId,
      trainingTitle: training.title,
    });
    await registration.save();

    // Format message to admin
    const msg = `📢 New Training Registration\n👤 Name: ${name}\n📞 Phone: ${phone}\n📘 Training: ${training.title}\n🕒 ${new Date().toLocaleString()}`;

    // Send WhatsApp via Twilio
    await client.messages.create({
      body: msg,
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: adminPhone
    });

    res.status(201).json({ success: true, message: "Registered and WhatsApp sent to admin" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// GET /api/training-registrations
router.get("/", async (req, res) => {
  try {
    const data = await TrainingRegistration.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ success: false, message: "Could not fetch registrations" });
  }
});

module.exports = router;
