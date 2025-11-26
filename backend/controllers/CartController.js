const CartModel = require("../models/CartModel");
const userModel = require("../models/UserModel");
const { products } = require("../data/productData");

const getCartlist = async (req, res) => {
    try {
        const userId = req.user && req.user._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await userModel.findById(userId).select("_id");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cart = await CartModel.findOne({ user: userId }).lean();

        if (!cart) {
            return res.json({
                success: true,
                cart: { user: userId, items: [], totalQuantity: 0, totalPrice: 0 },
            });
        }

        return res.json({ success: true, cart });
    } catch (error) {
        console.error("Get cart error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// build a price map once
const priceMap = new Map(products.map(p => [p._id, Number(p.price) || 0]));

/**
 * Helper to compute totalPrice from cart.items
 * items: [{ productId, quantity }, ...]
 */
function computeTotalPrice(items) {
    return items.reduce((sum, it) => {
        const price = priceMap.get(it.productId) ?? 0;
        const qty = Number(it.quantity) || 0;
        return sum + price * qty;
    }, 0);
}

const updateCart = async (req, res) => {
    try {
        const userId = req.user && req.user._id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const { productId, action, quantity, items } = req.body;
        const user = await userModel.findById(userId).select("_id");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        let cart = await CartModel.findOne({ user: userId });
        if (!cart) cart = new CartModel({ user: userId, items: [], totalQuantity: 0, totalPrice: 0 });

        if (Array.isArray(items)) {
            // replace cart
            const cleanItems = items
                .filter(it => it && typeof it.productId === "string" && typeof it.quantity === "number" && it.quantity > 0)
                .map(it => ({ productId: it.productId, quantity: Math.floor(it.quantity) }));

            cart.items = cleanItems;
            cart.totalQuantity = cart.items.reduce((s, it) => s + it.quantity, 0);
            cart.totalPrice = computeTotalPrice(cart.items);

            await cart.save();
            return res.json({ success: true, cart });
        }

        if (!productId || typeof productId !== "string") {
            return res.status(400).json({ success: false, message: "productId is required (or provide items array)" });
        }

        const act = (action || "add").toString().toLowerCase();
        const idx = cart.items.findIndex(it => it.productId === productId);

        if (act === "add") {
            const qtyToAdd = (typeof quantity === "number" && quantity > 0) ? Math.floor(quantity) : 1;
            if (idx > -1) cart.items[idx].quantity += qtyToAdd;
            else cart.items.push({ productId, quantity: qtyToAdd });
        } else if (act === "set") {
            if (typeof quantity !== "number") {
                return res.status(400).json({ success: false, message: "quantity (number) is required for action 'set'" });
            }
            const qty = Math.floor(quantity);
            if (qty <= 0) cart.items = cart.items.filter(it => it.productId !== productId);
            else if (idx > -1) cart.items[idx].quantity = qty;
            else cart.items.push({ productId, quantity: qty });
        } else if (act === "remove") {
            cart.items = cart.items.filter(it => it.productId !== productId);
        } else {
            return res.status(400).json({ success: false, message: "Invalid action" });
        }

        cart.totalQuantity = cart.items.reduce((s, it) => s + (it.quantity || 0), 0);
        cart.totalPrice = computeTotalPrice(cart.items);

        await cart.save();
        return res.json({ success: true, cart });
    } catch (err) {
        console.error("Update cart error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { updateCart };


module.exports = {
    getCartlist,
    updateCart
};
