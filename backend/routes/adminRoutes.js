const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('Admin', 'SuperAdmin'));

router.get('/dashboard/stats', adminController.getDashboardStats);

router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrder);
router.patch('/orders/:id/status', orderController.updateOrderStatus);

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);
router.patch('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
