const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const resolveProductId = async (idOrSlug) => {
  const isId = idOrSlug.match(/^[a-f\d]{24}$/i);
  const product = await Product.findOne(isId ? { _id: idOrSlug } : { slug: idOrSlug });
  return product;
};

// ── Customer-facing ────────────────────────────────────────────────────────────

// POST /api/v1/customer/reviews
exports.createReview = catchAsync(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    return next(new AppError('Please provide productId, rating, and comment', 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  const existing = await Review.findOne({ product: productId, customer: req.customer._id });
  if (existing) {
    return next(new AppError('You have already reviewed this product', 400));
  }

  const review = await Review.create({
    product: productId,
    customer: req.customer._id,
    rating,
    comment,
  });

  res.status(201).json({ status: 'success', data: { review } });
});

// GET /api/v1/customer/reviews
exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ customer: req.customer._id })
    .populate('product', 'name images slug')
    .sort('-createdAt');

  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
});

// ── Public ────────────────────────────────────────────────────────────────────

// GET /api/v1/products/public/:idOrSlug/reviews
exports.getProductReviews = catchAsync(async (req, res, next) => {
  const product = await resolveProductId(req.params.idOrSlug);
  if (!product) return next(new AppError('Product not found', 404));

  const reviews = await Review.find({ product: product._id, status: 'Published' })
    .populate('customer', 'name')
    .sort('-createdAt');

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews, avgRating, reviewCount: reviews.length },
  });
});

// ── Admin ─────────────────────────────────────────────────────────────────────

// GET /api/v1/admin/reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const reviews = await Review.find(filter)
    .populate('product', 'name')
    .populate('customer', 'name')
    .sort('-createdAt');

  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
});

// PATCH /api/v1/admin/reviews/:id/status
exports.updateReviewStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['Pending', 'Published', 'Flagged'];

  if (!allowedStatuses.includes(status)) {
    return next(new AppError(`Status must be one of: ${allowedStatuses.join(', ')}`, 400));
  }

  const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!review) return next(new AppError('No review found with that ID', 404));

  res.status(200).json({ status: 'success', data: { review } });
});

// DELETE /api/v1/admin/reviews/:id
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return next(new AppError('No review found with that ID', 404));

  res.status(204).json({ status: 'success', data: null });
});
