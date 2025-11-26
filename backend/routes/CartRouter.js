const { getCartlist, updateCart } = require("../controllers/CartController");
const ensureAuthenticated = require("../middleware/Auth");

const router = require("express").Router();

// Get cart items
router.get("/", ensureAuthenticated, getCartlist);

// Add item to cart
router.put("/update", ensureAuthenticated, updateCart);


module.exports = router;
