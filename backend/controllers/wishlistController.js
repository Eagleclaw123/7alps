const Customer = require('../models/customerModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET /api/v1/customer/wishlist
exports.getWishlist = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.customer._id).populate({
    path: 'wishlist',
    match: { active: true },
  });

  res.status(200).json({
    status: 'success',
    results: customer.wishlist.length,
    data: { products: customer.wishlist },
  });
});

// POST /api/v1/customer/wishlist/:productId
exports.addToWishlist = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findOne({ _id: productId, active: true });
  if (!product) return next(new AppError('Product not found', 404));

  await Customer.findByIdAndUpdate(req.customer._id, {
    $addToSet: { wishlist: productId },
  });

  res.status(200).json({ status: 'success', message: 'Added to wishlist' });
});

// DELETE /api/v1/customer/wishlist/:productId
exports.removeFromWishlist = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  await Customer.findByIdAndUpdate(req.customer._id, {
    $pull: { wishlist: productId },
  });

  res.status(200).json({ status: 'success', message: 'Removed from wishlist' });
});
