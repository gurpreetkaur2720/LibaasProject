const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Product = require("../models/Product");

// GET wishlist
router.get("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("Get Wishlist Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD to wishlist
router.post("/wishlist/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid productId" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) return res.status(404).json({ msg: "Product not found" });

    const user = await User.findById(req.user.id);
    if (user.wishlist.includes(productId)) return res.json({ msg: "Already in wishlist" });

    user.wishlist.push(productId);
    await user.save();
    await user.populate("wishlist");

    res.json({ msg: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("Wishlist Add Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// REMOVE from wishlist
router.delete("/wishlist/remove/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid productId" });

    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(item => item.toString() !== id);
    await user.save();
    await user.populate("wishlist");

    res.json({ msg: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("Wishlist Remove Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET cart
router.get("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    res.json({ cart: user.cart });
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD to cart
router.post("/cart/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid productId" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) return res.status(404).json({ msg: "Product not found" });

    const user = await User.findById(req.user.id);
    const existing = user.cart.find(item => item.product.toString() === productId);

    if (existing) existing.quantity += 1;
    else user.cart.push({ product: productId, quantity: 1 });

    await user.save();
    await user.populate("cart.product");

    res.json({ msg: "Added to cart", cart: user.cart });
  } catch (err) {
    console.error("Cart Add Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// REMOVE from cart
router.delete("/cart/remove/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid productId" });

    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(item => item.product.toString() !== id);
    await user.save();
    await user.populate("cart.product");

    res.json({ msg: "Removed from cart", cart: user.cart });
  } catch (err) {
    console.error("Cart Remove Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
