const express = require('express');
const customerAuthController = require('../controllers/customerAuthController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const reviewController = require('../controllers/reviewController');
const paymentController = require('../controllers/paymentController');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

// ── Auth (no auth required) ───────────────────────────────────────────────────
router.post('/send-otp', customerAuthController.sendOTP);
router.post('/verify-otp', customerAuthController.verifyOTP);
router.post('/complete-mobile', customerAuthController.completeMobile);

// ── Protected ──────────────────────────────────────────────────────────────────
router.use(customerAuthController.protectCustomer);

router.get('/status', customerAuthController.getCurrentCustomerStatus);
router.post('/logout', customerAuthController.logout);
router.patch('/profile', customerAuthController.updateProfile);
router.patch('/addresses', customerAuthController.updateAddresses);

// Cart
router.route('/cart').get(cartController.getCart).delete(cartController.clearCart);
router.post('/cart/items', cartController.addItem);
router.patch('/cart/items/:productId', cartController.updateItemQuantity);
router.delete('/cart/items/:productId', cartController.removeItem);

// Orders
router.route('/orders').get(orderController.getMyOrders).post(orderController.createOrder);
router.get('/orders/:id', orderController.getMyOrder);

// Reviews
router.route('/reviews').get(reviewController.getMyReviews).post(reviewController.createReview);

// Wishlist
router.get('/wishlist', wishlistController.getWishlist);
router.post('/wishlist/:productId', wishlistController.addToWishlist);
router.delete('/wishlist/:productId', wishlistController.removeFromWishlist);

// Payments (Razorpay)
router.post('/payments/razorpay-order', paymentController.createRazorpayOrder);
router.post('/payments/razorpay-verify', paymentController.verifyRazorpayPayment);

module.exports = router;
