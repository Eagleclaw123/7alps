const express = require('express');
const customerAuthController = require('../controllers/customerAuthController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

const router = express.Router();

// ── Auth (no auth required) ───────────────────────────────────────────────────
router.post('/send-otp', customerAuthController.sendOTP);
router.post('/verify-otp', customerAuthController.verifyOTP);

// ── Protected ──────────────────────────────────────────────────────────────────
router.use(customerAuthController.protectCustomer);

router.get('/status', customerAuthController.getCurrentCustomerStatus);
router.post('/logout', customerAuthController.logout);
router.patch('/addresses', customerAuthController.updateAddresses);

// Cart
router.route('/cart').get(cartController.getCart).delete(cartController.clearCart);
router.post('/cart/items', cartController.addItem);
router.patch('/cart/items/:productId', cartController.updateItemQuantity);
router.delete('/cart/items/:productId', cartController.removeItem);

// Orders
router.route('/orders').get(orderController.getMyOrders).post(orderController.createOrder);
router.get('/orders/:id', orderController.getMyOrder);

module.exports = router;
