const mongoose = require("mongoose");

//
// CART SCHEMA
//
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

//
// WISHLIST SCHEMA
// Store only product IDs
//
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

//
// USER SCHEMA
//
const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  // UPDATED FIELDS
  cart: {
    type: [CartItemSchema],
    default: []
  },

  wishlist: {
    type: [WishlistItemSchema],
    default: []
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("User", UserSchema);
