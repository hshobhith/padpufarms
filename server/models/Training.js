const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: String,         // Optional
  time: String,         // Optional
  duration: String,     // Optional
  fees: String,         // Optional
  imageUrl: String      // Relative path for image
});

module.exports = mongoose.model("Training", trainingSchema);
