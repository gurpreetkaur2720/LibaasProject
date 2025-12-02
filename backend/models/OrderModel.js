// models/OrderModel.js
const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: { type: String, default: "pending" },
    status: { type: String, default: "Processing" }, // Processing → Shipped → Delivered
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
