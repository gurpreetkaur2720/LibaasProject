const Order = require("../models/OrderModel");
const CartModel = require("../models/CartModel");

// CREATE ORDER — separate order for each cart item with address
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Not authenticated" });

    const { items, address } = req.body;
    if (!items || !items.length)
      return res.status(400).json({ success: false, message: "No items provided" });

    if (!address || !address.trim())
      return res.status(400).json({ success: false, message: "Address is required" });

    const createdOrders = [];

    for (let item of items) {
      const order = new Order({
        userId,
        items: [item], // one item per order
        totalAmount: item.price * item.quantity,
        paymentMethod: "COD",
        paymentStatus: "pending",
        status: "Processing",
        address, // save delivery address
      });

      await order.save();
      createdOrders.push(order);
    }

    // Clear cart after placing order
    const cart = await CartModel.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      cart.totalQuantity = 0;
      cart.totalPrice = 0;
      await cart.save();
    }

    return res.status(201).json({
      success: true,
      message: "Orders placed successfully!",
      orders: createdOrders,
    });
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET MY ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Not authenticated" });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("getMyOrders error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
