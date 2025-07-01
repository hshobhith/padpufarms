const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB URI from .env
const uri = process.env.MONGO_URI || "mongodb+srv://hshobhith196:NbYkigY5TgAoOKVG@cluster0.pmoolqt.mongodb.net/farm";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");

    // Start server only after DB connection
    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  } catch (error) {
    console.error(`❌ Unable to connect to MongoDB: ${error.message}`);
  }
};

connectDB();
// Routes
app.use("/api/admin/products", require("./routes/admin/products"));
app.use("/api/admin/trainings", require("./routes/admin/trainings"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/training-registrations", require("./routes/trainingRegistrations"));
app.use("/api/faqs", require("./routes/faq"));