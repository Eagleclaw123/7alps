const express = require('express');
const b2bAuthController = require('../controllers/b2bAuthController');
const quoteController = require('../controllers/quoteController');
const orderController = require('../controllers/orderController');

const router = express.Router();

// ── Auth (no auth required) ───────────────────────────────────────────────────
router.post('/login', b2bAuthController.login);
router.post('/forgotPassword', b2bAuthController.forgotPassword);
router.post('/verifyOTP', b2bAuthController.verifyOTP);
router.post('/resetPasswordAfterOTP', b2bAuthController.resetPasswordAfterOTP);

// ── Protected ──────────────────────────────────────────────────────────────────
router.use(b2bAuthController.protectB2B);

router.get('/status', b2bAuthController.getCurrentStatus);
router.post('/logout', b2bAuthController.logout);

router.get('/dashboard/stats', quoteController.getMyDashboardStats);

router.route('/quotes').get(quoteController.getMyQuotes).post(quoteController.createQuote);
router.get('/quotes/:id', quoteController.getMyQuote);

router.get('/orders', orderController.getMyB2BOrders);
router.get('/orders/:id', orderController.getMyB2BOrder);

module.exports = router;
