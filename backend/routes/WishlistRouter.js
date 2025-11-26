const { getWishlist, addWishlistItem, removeWishlistItem } = require("../controllers/WishlistController");
const ensureAuthenticated = require("../middleware/Auth");

const router = require("express").Router();

// Get wishlist items
router.get("/", ensureAuthenticated, getWishlist);

// Add item to wishlist
router.post("/add", ensureAuthenticated, addWishlistItem);

// Remove item from wishlist
router.delete("/remove", ensureAuthenticated, removeWishlistItem);

module.exports = router;
