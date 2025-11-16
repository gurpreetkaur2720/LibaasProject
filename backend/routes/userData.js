const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// -----------------------------------------------------------
// ---------------------- WISHLIST ROUTES --------------------
// -----------------------------------------------------------

// ✅ GET WISHLIST
router.get("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("Get Wishlist Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ ADD TO WISHLIST
router.post("/wishlist/add", auth, async (req, res) => {
  try {
    console.log("Wishlist Add Body:", req.body);

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ msg: "productId missing" });
    }

    const user = await User.findById(req.user.id);

    // Already exists?
    if (user.wishlist.includes(productId)) {
      return res.json({ msg: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ msg: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("Wishlist Add Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ REMOVE FROM WISHLIST
router.delete("/wishlist/remove/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== req.params.id
    );

    await user.save();
    res.json({ msg: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("Wishlist Remove Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// -----------------------------------------------------------
// ---------------------- CART ROUTES ------------------------
// -----------------------------------------------------------

// ✅ GET CART
router.get("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    res.json({ cart: user.cart });
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ ADD TO CART
router.post("/cart/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ msg: "productId missing" });
    }

    const user = await User.findById(req.user.id);

    // Already exists?
    const existing = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.json({ msg: "Added to cart", cart: user.cart });
  } catch (err) {
    console.error("Cart Add Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ REMOVE FROM CART
router.delete("/cart/remove/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.id
    );

    await user.save();
    res.json({ msg: "Removed from cart", cart: user.cart });
  } catch (err) {
    console.error("Cart Remove Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
