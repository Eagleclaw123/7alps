const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const orderController = require('../controllers/orderController');
const b2bController = require('../controllers/b2bController');
const quoteController = require('../controllers/quoteController');
const reviewController = require('../controllers/reviewController');
const settingsController = require('../controllers/settingsController');
const contactController = require('../controllers/contactController');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('Admin', 'SuperAdmin'));

router.get('/dashboard/stats', adminController.getDashboardStats);

router
  .route('/settings')
  .get(settingsController.getSettings)
  .patch(settingsController.updateSettings);

router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrder);
router.patch('/orders/:id/status', orderController.updateOrderStatus);

router.get('/quotes', quoteController.getAllQuotes);
router.get('/quotes/:id', quoteController.getQuote);
router.patch('/quotes/:id/approve', quoteController.approveQuote);
router.patch('/quotes/:id/reject', quoteController.rejectQuote);

router.route('/b2b').get(b2bController.getAllB2BMembers).post(b2bController.createB2BMember);
router
  .route('/b2b/:id')
  .get(b2bController.getB2BMember)
  .patch(b2bController.updateB2BMember)
  .delete(b2bController.deleteB2BMember);

router.get('/reviews', reviewController.getAllReviews);
router.patch('/reviews/:id/status', reviewController.updateReviewStatus);
router.delete('/reviews/:id', reviewController.deleteReview);

router.get('/contacts', contactController.getAllContacts);
router.patch('/contacts/:id/status', contactController.updateContactStatus);
router.delete('/contacts/:id', contactController.deleteContact);

router.get('/customers', adminController.getAllCustomers);

router.get('/newsletter', newsletterController.getAllSubscribers);

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);
router.patch('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
