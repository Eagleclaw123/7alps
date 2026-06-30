const fs = require('fs');
const path = require('path');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// ─── PUBLIC ──────────────────────────────────────────────────────────────────

// GET /api/v1/products/public
exports.getPublicProducts = catchAsync(async (req, res, next) => {
  const filter = { active: true };
  if (req.query.category) filter.category = req.query.category;

  const products = await Product.find(filter).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
});

// GET /api/v1/products/public/:idOrSlug
exports.getPublicProduct = catchAsync(async (req, res, next) => {
  const { idOrSlug } = req.params;
  const isId = idOrSlug.match(/^[a-f\d]{24}$/i);

  const product = await Product.findOne({
    ...(isId ? { _id: idOrSlug } : { slug: idOrSlug }),
    active: true,
  });

  if (!product) return next(new AppError('Product not found', 404));

  res.status(200).json({ status: 'success', data: { product } });
});

// ─── ADMIN ───────────────────────────────────────────────────────────────────


const IMAGE_DIR = path.join(__dirname, '../public/images/products');

const deleteImageFile = (filename) => {
  if (!filename) return;
  const filepath = path.join(IMAGE_DIR, filename);
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
};

// POST /api/v1/products
exports.createProduct = catchAsync(async (req, res, next) => {
  const data = { ...req.body };

  if (req.files?.coverImage?.[0]) {
    data.coverImage = req.files.coverImage[0].filename;
  }
  if (req.files?.images) {
    data.images = req.files.images.map((f) => f.filename);
  }
  if (typeof data.tags === 'string') {
    data.tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  if (data.price) data.price = Number(data.price);
  if (data.mrp) data.mrp = Number(data.mrp);

  const product = await Product.create(data);

  res.status(201).json({ status: 'success', data: { product } });
});

// GET /api/v1/products  (admin sees all; public sees active only via query)
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.query.active !== undefined) {
    filter.active = req.query.active === 'true';
  }
  if (req.query.category) {
    filter.category = req.query.category;
  }

  const products = await Product.find(filter).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
});

// GET /api/v1/products/:id
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('No product found with that ID', 404));

  res.status(200).json({ status: 'success', data: { product } });
});

// PATCH /api/v1/products/:id
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('No product found with that ID', 404));

  const data = { ...req.body };

  if (req.files?.coverImage?.[0]) {
    deleteImageFile(product.coverImage);
    data.coverImage = req.files.coverImage[0].filename;
  }
  if (req.files?.images) {
    product.images.forEach(deleteImageFile);
    data.images = req.files.images.map((f) => f.filename);
  }
  if (typeof data.tags === 'string') {
    data.tags = data.tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  if (data.price) data.price = Number(data.price);
  if (data.mrp) data.mrp = Number(data.mrp);
  if (data.active !== undefined) data.active = data.active === 'true' || data.active === true;
  if (data.inStock !== undefined) data.inStock = data.inStock === 'true' || data.inStock === true;

  const updated = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', data: { product: updated } });
});

// PATCH /api/v1/products/:id/toggle-status
exports.toggleStatus = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('No product found with that ID', 404));

  product.active = !product.active;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ status: 'success', data: { product } });
});

// DELETE /api/v1/products/:id
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('No product found with that ID', 404));

  deleteImageFile(product.coverImage);
  product.images.forEach(deleteImageFile);

  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: 'success', data: null });
});
