const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../utils/cloudinary");

// Setup Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "padpufarms/products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// Create Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, stock, quantityLabel } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const product = new Product({
      name,
      description,
      price,
      stock,
      quantityLabel,
      imageUrl,
    });

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
      updateData.imageUrl = req.file.path; // Cloudinary image URL
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
