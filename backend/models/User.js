const mongoose = require("mongoose");

// ------------------- CART ITEM SCHEMA -------------------
const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: true }
);

// ------------------- USER SCHEMA -------------------
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // SIMPLE ARRAY OF PRODUCT IDs FOR WISHLIST
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  ],

  // CART: productId + quantity
  cart: {
    type: [CartItemSchema],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
