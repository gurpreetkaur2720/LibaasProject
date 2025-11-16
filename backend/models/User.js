// backend/models/User.js
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  },
  { _id: true }
);

const WishlistItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  },
  { _id: true }
);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] },
  wishlist: { type: [WishlistItemSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
