const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { uploadToR2, deleteFromR2 } = require('../utils/r2');

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const parseListField = (value) => {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === 'string' && value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((v) => String(v).trim()).filter(Boolean);
      }
    } catch (err) {
      // fall through to comma-splitting below
    }
  }
  if (typeof value === 'string') {
    return value.split(',').map((v) => v.trim()).filter(Boolean);
  }
  return undefined;
};

const parseVariants = (value) => {
  if (value === undefined) return undefined;

  let raw = value;
  if (typeof value === 'string') {
    try {
      raw = JSON.parse(value);
    } catch (err) {
      throw new AppError('Invalid variants format. Expected a JSON array.', 400);
    }
  }

  if (!Array.isArray(raw)) {
    throw new AppError('Invalid variants format. Expected a JSON array.', 400);
  }

  return raw.map((v) => ({
    label: v.label,
    price: Number(v.price),
    mrp: v.mrp !== undefined && v.mrp !== '' ? Number(v.mrp) : undefined,
    stock: v.stock !== undefined && v.stock !== '' ? Number(v.stock) : 0,
    isDefault: v.isDefault === true || v.isDefault === 'true',
  }));
};

const LIST_FIELDS = ['taglines', 'keyHighlights', 'ingredients', 'usageSuggestions', 'tags'];

const applyBodyFields = (data) => {
  LIST_FIELDS.forEach((field) => {
    const parsed = parseListField(data[field]);
    if (parsed !== undefined) data[field] = parsed;
  });

  const variants = parseVariants(data.variants);
  if (variants !== undefined) data.variants = variants;

  if (data.active !== undefined) data.active = data.active === 'true' || data.active === true;

  return data;
};

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

// POST /api/v1/products
exports.createProduct = catchAsync(async (req, res, next) => {
  const data = applyBodyFields({ ...req.body });

  if (req.files?.coverImage?.[0]) {
    data.coverImage = await uploadToR2(req.files.coverImage[0]);
  }
  if (req.files?.images) {
    data.images = await Promise.all(req.files.images.map((f) => uploadToR2(f)));
  }

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

  const data = applyBodyFields({ ...req.body });

  if (req.files?.coverImage?.[0]) {
    await deleteFromR2(product.coverImage);
    data.coverImage = await uploadToR2(req.files.coverImage[0]);
  }
  if (req.files?.images) {
    await Promise.all(product.images.map(deleteFromR2));
    data.images = await Promise.all(req.files.images.map((f) => uploadToR2(f)));
  }

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

  await deleteFromR2(product.coverImage);
  await Promise.all(product.images.map(deleteFromR2));

  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: 'success', data: null });
});

// ─── SHARED HELPER (used by orderController) ────────────────────────────────

// Decrements stock for a specific variant and bumps orderCount. Throws AppError
// if the product/variant doesn't exist or stock is insufficient.
exports.decrementVariantStock = async (productId, variantLabel, quantity, session) => {
  const product = await Product.findById(productId).session(session || null);
  if (!product) throw new AppError(`Product not found: ${productId}`, 404);

  const variant = product.variants.find((v) => v.label === variantLabel);
  if (!variant) throw new AppError(`Variant "${variantLabel}" not found on product "${product.name}"`, 400);

  if (variant.stock < quantity) {
    throw new AppError(`Insufficient stock for "${product.name}" (${variantLabel})`, 400);
  }

  variant.stock -= quantity;
  product.orderCount += quantity;
  await product.save({ validateBeforeSave: false, session: session || undefined });

  return product;
};
