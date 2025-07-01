const express = require("express");
const router = express.Router();
const Training = require("../../models/Training");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "padpufarms/trainings",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

// GET all trainings
router.get("/", async (req, res) => {
  try {
    const trainings = await Training.find().sort({ _id: -1 });
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trainings" });
  }
});

// POST a new training
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, time, duration, fees } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const training = new Training({
      title,
      description,
      date,
      time,
      duration,
      fees,
      imageUrl,
    });

    await training.save();
    res.json({ success: true });
  } catch (err) {
    console.error("POST training error:", err.message);
    res.status(500).json({ error: "Failed to create training" });
  }
});

// PUT update training
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, time, duration, fees } = req.body;
    const training = await Training.findById(req.params.id);

    if (!training) return res.status(404).json({ error: "Training not found" });

    training.title = title;
    training.description = description;
    training.date = date;
    training.time = time;
    training.duration = duration;
    training.fees = fees;

    if (req.file) {
      training.imageUrl = req.file.path;
    }

    await training.save();
    res.json({ success: true });
  } catch (err) {
    console.error("PUT training error:", err.message);
    res.status(500).json({ error: "Failed to update training" });
  }
});

// DELETE training
router.delete("/:id", async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ error: "Training not found" });

    await Training.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE training error:", err.message);
    res.status(500).json({ error: "Failed to delete training" });
  }
});

module.exports = router;
