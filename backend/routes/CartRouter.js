const { getCartlist, updateCart, clearCart } = require("../controllers/CartController");
const ensureAuthenticated = require("../middleware/Auth");
const router = require("express").Router();

router.get("/", ensureAuthenticated, getCartlist);
router.put("/update", ensureAuthenticated, updateCart);
router.delete("/clear", ensureAuthenticated, clearCart);

module.exports = router;
