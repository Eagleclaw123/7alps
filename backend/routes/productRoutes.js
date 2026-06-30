const express = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const { uploadProductImages } = require('../utils/upload');

const router = express.Router();

// ── Public routes (no auth required) ─────────────────────────────────────────
router.get('/public', productController.getPublicProducts);
router.get('/public/:idOrSlug', productController.getPublicProduct);

// ── Admin routes (protected) ──────────────────────────────────────────────────
router.use(authController.protect);
router.use(authController.restrictTo('Admin', 'SuperAdmin'));

router
  .route('/')
  .get(productController.getAllProducts)
  .post(uploadProductImages, productController.createProduct);

router.patch('/:id/toggle-status', productController.toggleStatus);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(uploadProductImages, productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
