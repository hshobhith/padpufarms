const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Twilio Setup
const accountSid = "AC6828a61136cd09b9f3f59d054850d4d2";
const authToken = "1f8ad7248a8538f43d08a3f6c1e461d7"; // ⚠️ Move this to .env
const client = require("twilio")(accountSid, authToken);

const adminPhone = "whatsapp:+916366076182"; // Admin WhatsApp (must join sandbox)

// @route   POST /api/orders
// @desc    Place an order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // Format WhatsApp message
    const msg = `🛒 *New Order Placed!*\n\n👤 Name: ${req.body.name}\n📞 Phone: ${req.body.phone}\n📦 Product: ${req.body.productName}\n🧮 Qty: ${req.body.quantity}\n💰 Total: ₹${req.body.totalAmount}\n🏠 Address: ${req.body.address}, ${req.body.pincode}\n🕒 Time: ${new Date().toLocaleString()}`;

    // Send WhatsApp message to admin
    await client.messages.create({
      body: msg,
      from: "whatsapp:+14155238886", 
      to: adminPhone,
    });

    res.status(201).json({ success: true, message: "Order placed and admin notified!" });
  } catch (err) {
    console.error("Order creation error:", err.message);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (admin usage)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderedAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Order fetching error:", err.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status (admin usage)
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.error("Order status update failed:", err.message);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
