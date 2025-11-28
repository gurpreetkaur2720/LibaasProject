const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const auth = require('../middleware/Auth');

// Create an order (supports COD + QR Payment)
router.post('/create', auth, OrderController.createOrder);

// User's own orders
router.get('/my-orders', auth, OrderController.getMyOrders);

module.exports = router;
