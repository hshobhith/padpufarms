const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../../models/Product");

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Create Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, stock, quantityLabel } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({ name, description, price, stock, quantityLabel, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update Product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, stock, quantityLabel } = req.body;
    const updateData = { name, description, price, stock, quantityLabel };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
