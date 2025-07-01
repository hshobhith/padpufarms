const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },

  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true },

  status: { type: String, default: "Pending" },
  orderedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
