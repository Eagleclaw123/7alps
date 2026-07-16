const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Builds a Map of category name -> active product count.
const getProductCountsByCategory = async () => {
  const counts = await Product.aggregate([
    { $match: { active: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  return new Map(counts.map((c) => [c._id, c.count]));
};

// ── Public ────────────────────────────────────────────────────────────────────

// GET /api/v1/categories/public
exports.getPublicCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({ active: true }).sort('name');
  const countsByCategory = await getProductCountsByCategory();

  const categoriesWithCounts = categories.map((cat) => ({
    ...cat.toObject(),
    productCount: countsByCategory.get(cat.name) || 0,
  }));

  res.status(200).json({
    status: 'success',
    results: categoriesWithCounts.length,
    data: { categories: categoriesWithCounts },
  });
});

// ── Admin ─────────────────────────────────────────────────────────────────────

// GET /api/v1/categories
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find().sort('name');
  const countsByCategory = await getProductCountsByCategory();

  const categoriesWithCounts = categories.map((cat) => ({
    ...cat.toObject(),
    productCount: countsByCategory.get(cat.name) || 0,
  }));

  res.status(200).json({
    status: 'success',
    results: categoriesWithCounts.length,
    data: { categories: categoriesWithCounts },
  });
});

// POST /api/v1/categories
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name, description, image, active } = req.body;

  if (!name) {
    return next(new AppError('Category name is required', 400));
  }

  const category = await Category.create({ name, description, image, active });

  res.status(201).json({ status: 'success', data: { category } });
});

// PATCH /api/v1/categories/:id
exports.updateCategory = catchAsync(async (req, res, next) => {
  const { name, description, image, active } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description, image, active },
    { new: true, runValidators: true },
  );

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: { category } });
});

// PATCH /api/v1/categories/:id/toggle-status
exports.toggleCategoryStatus = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  category.active = !category.active;
  await category.save();

  res.status(200).json({ status: 'success', data: { category } });
});

// DELETE /api/v1/categories/:id
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  const productsUsingCategory = await Product.countDocuments({ category: category.name });
  if (productsUsingCategory > 0) {
    return next(
      new AppError(
        `Cannot delete "${category.name}" — ${productsUsingCategory} product(s) still use it. Reassign or deactivate them first.`,
        400,
      ),
    );
  }

  await Category.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: 'success', data: null });
});
