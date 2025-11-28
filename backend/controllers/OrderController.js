const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
  try {
    // User detect from auth middleware
    const userId = req.user && req.user.id ? req.user.id : req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const { items, totalAmount, shippingAddress, paymentMethod, transactionId } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: 'No items provided' });
    }

    // ------------------------------
    // PAYMENT STATUS LOGIC UPDATED
    // ------------------------------
    let paymentStatus = "pending";

    if (paymentMethod === "CARD") {
      paymentStatus = "paid";
    }

    if (paymentMethod === "QR") {
      paymentStatus = "paid";  // QR scan = payment received
    }

    // Create order
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,   // COD | QR | CARD
      paymentStatus,   // pending | paid
      transactionId: transactionId || null   // Store QR data here
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message:
        paymentMethod === "COD"
          ? "COD Order Placed Successfully!"
          : "Payment Successful & Order Created!",
      order
    });

  } catch (err) {
    console.error('createOrder error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return res.json({ orders });

  } catch (err) {
    console.error('getMyOrders error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
