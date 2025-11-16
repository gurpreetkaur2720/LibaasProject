// backend/routes/userData.js
const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// ---------------- WISHLIST ----------------

// GET wishlist
router.get("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist.product");
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD to wishlist
router.post("/wishlist/add", auth, async (req, res) => {
  try {
    const { productId } = req.body; // NOTE: expecting productId from frontend
    const user = await User.findById(req.user.id);

    // Prevent duplicates
    const exists = user.wishlist.some(
      (item) => item.product.toString() === productId
    );
    if (!exists) {
      user.wishlist.push({ product: productId });
      await user.save();
    }

    res.json({ msg: "Added to wishlist" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// REMOVE from wishlist
router.delete("/wishlist/remove/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.id;

    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    res.json({ msg: "Removed from wishlist" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ---------------- CART -----------------

// GET cart
router.get("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    res.json({ cart: user.cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD to cart
router.post("/cart/add", auth, async (req, res) => {
  try {
    const { productId } = req.body; // expecting productId from frontend
    const user = await User.findById(req.user.id);

    // Check if already in cart
    const exists = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (exists) {
      exists.quantity += 1; // increment quantity
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.json({ msg: "Added to cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// REMOVE from cart
router.delete("/cart/remove/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.id;

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    res.json({ msg: "Removed from cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
