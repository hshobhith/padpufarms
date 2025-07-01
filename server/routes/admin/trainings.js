const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Training = require("../../models/Training");

// Image upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../uploads/trainings");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET all trainings
router.get("/", async (req, res) => {
  const trainings = await Training.find().sort({ _id: -1 });
  res.json(trainings);
});

// POST a new training
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, date, time, duration, fees } = req.body;
  const imageUrl = req.file ? `/uploads/trainings/${req.file.filename}` : null;

  const training = new Training({ title, description, date, time, duration, fees, imageUrl });
  await training.save();
  res.json({ success: true });
});

// PUT update training
router.put("/:id", upload.single("image"), async (req, res) => {
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
    if (training.imageUrl) {
      const oldPath = path.join(__dirname, "../../", training.imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    training.imageUrl = `/uploads/trainings/${req.file.filename}`;
  }

  await training.save();
  res.json({ success: true });
});

// DELETE training
router.delete("/:id", async (req, res) => {
  const training = await Training.findById(req.params.id);
  if (!training) return res.status(404).json({ error: "Training not found" });

  // Delete image if exists
  if (training.imageUrl) {
    const imgPath = path.join(__dirname, "../../", training.imageUrl);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await Training.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
