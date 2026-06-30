const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('Admin', 'SuperAdmin'));

router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);
router.patch('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
