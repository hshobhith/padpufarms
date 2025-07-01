const express = require("express");
const router = express.Router();
const FAQQuestion = require("../models/FAQQuestion");

// Twilio setup
const accountSid = "AC6828a61136cd09b9f3f59d054850d4d2";
const authToken = "1f8ad7248a8538f43d08a3f6c1e461d7"; // Replace with actual token
const client = require("twilio")(accountSid, authToken);

// Admin WhatsApp number (joined sandbox)
const adminPhone = "whatsapp:+916366076182";

// POST a new question
router.post("/ask", async (req, res) => {
  const { name, phone, question } = req.body;

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  const existing = await FAQQuestion.findOne({ phone });
  if (existing) {
    return res.status(409).json({ message: "You’ve already asked a question. Please wait for a response." });
  }

  try {
    const newQuestion = new FAQQuestion({ name, phone, question });
    await newQuestion.save();

    // Format WhatsApp message
    const message = `❓ *New FAQ Question Submitted* \n👤 Name: ${name}\n📞 Phone: ${phone}\n💬 Question: ${question}\n📅 ${new Date().toLocaleString()}`;

    // Send WhatsApp message to admin
    await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886", // Twilio sandbox number
      to: adminPhone
    });

    res.status(201).json({ message: "Question submitted successfully!" });
  } catch (err) {
    console.error("Error submitting question:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET all FAQs with answers (for frontend display)
router.get("/", async (req, res) => {
  const faqs = await FAQQuestion.find({ answer: { $exists: true, $ne: "" } }).sort({ createdAt: -1 });
  res.json(faqs);
});


// PUT /api/faqs/:id - Answer a question
router.put("/:id", async (req, res) => {
  try {
    const updated = await FAQQuestion.findByIdAndUpdate(
      req.params.id,
      { answer: req.body.answer },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Answer update failed" });
  }
});

// GET /api/faqs/unanswered
router.get("/unanswered", async (req, res) => {
  try {
    const unanswered = await FAQQuestion.find({ answer: { $exists: false } }).sort({ createdAt: -1 });
    res.json(unanswered);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});


module.exports = router;
