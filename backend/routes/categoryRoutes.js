const express = require('express');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// ── Public ────────────────────────────────────────────────────────────────────
router.get('/public', categoryController.getPublicCategories);

// ── Admin ─────────────────────────────────────────────────────────────────────
router.use(authController.protect);
router.use(authController.restrictTo('Admin', 'SuperAdmin'));

router.route('/').get(categoryController.getAllCategories).post(categoryController.createCategory);

router.patch('/:id/toggle-status', categoryController.toggleCategoryStatus);

router
  .route('/:id')
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
