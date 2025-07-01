const mongoose = require("mongoose");

const trainingRegistrationSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: "Training" },
    trainingTitle: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainingRegistration", trainingRegistrationSchema);
