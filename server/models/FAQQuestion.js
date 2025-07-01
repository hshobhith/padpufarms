const mongoose = require("mongoose");

const faqQuestionSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true
  },
  answer: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("FAQQuestion", faqQuestionSchema);
