const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

const findVariant = (product, variantLabel) =>
  product.variants.find((v) => v.label === variantLabel);

// Builds the response payload with live pricing looked up from each item's
// product/variant, so the cart is never out of sync with catalog changes.
const buildCartResponse = async (cart) => {
  const items = [];

  for (const item of cart.items) {
    const product = item.product;
    if (!product) continue; // product was deleted after being added to cart

    const variant = findVariant(product, item.variantLabel);
    const price = variant ? variant.price : 0;

    items.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0],
      category: product.category,
      variantLabel: item.variantLabel,
      price,
      quantity: item.quantity,
      subtotal: price * item.quantity,
      inStock: Boolean(variant && variant.stock > 0),
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = items.length && subtotal <= FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return {
    _id: cart._id,
    items,
    subtotal,
    shipping,
    total,
  };
};

const getOrCreateCart = async (customerId) => {
  let cart = await Cart.findOne({ customer: customerId });
  if (!cart) cart = await Cart.create({ customer: customerId, items: [] });
  return cart;
};

// GET /api/v1/customer/cart
exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await getOrCreateCart(req.customer._id);
  await cart.populate('items.product');

  const payload = await buildCartResponse(cart);

  res.status(200).json({ status: 'success', data: { cart: payload } });
});

// POST /api/v1/customer/cart/items
exports.addItem = catchAsync(async (req, res, next) => {
  const { productId, variantLabel, quantity } = req.body;

  if (!productId || !variantLabel) {
    return next(new AppError('Please provide productId and variantLabel', 400));
  }

  const product = await Product.findOne({ _id: productId, active: true });
  if (!product) return next(new AppError('Product not found', 404));

  const variant = findVariant(product, variantLabel);
  if (!variant) return next(new AppError(`Variant "${variantLabel}" not found`, 400));

  const qtyToAdd = Number(quantity) > 0 ? Number(quantity) : 1;

  const cart = await getOrCreateCart(req.customer._id);
  const existing = cart.items.find(
    (item) => item.product.toString() === productId && item.variantLabel === variantLabel,
  );

  const nextQuantity = (existing?.quantity || 0) + qtyToAdd;
  if (variant.stock < nextQuantity) {
    return next(new AppError(`Only ${variant.stock} unit(s) available for "${product.name}" (${variantLabel})`, 400));
  }

  if (existing) {
    existing.quantity = nextQuantity;
  } else {
    cart.items.push({ product: productId, variantLabel, quantity: qtyToAdd });
  }

  await cart.save();
  await cart.populate('items.product');

  const payload = await buildCartResponse(cart);
  res.status(200).json({ status: 'success', data: { cart: payload } });
});

// PATCH /api/v1/customer/cart/items/:productId
exports.updateItemQuantity = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { variantLabel, type } = req.body;

  const cart = await getOrCreateCart(req.customer._id);
  const item = cart.items.find(
    (i) => i.product.toString() === productId && i.variantLabel === variantLabel,
  );

  if (!item) return next(new AppError('Item not found in cart', 404));

  if (type === 'increase') {
    const product = await Product.findById(productId);
    const variant = product && findVariant(product, variantLabel);
    if (variant && item.quantity + 1 > variant.stock) {
      return next(new AppError(`Only ${variant.stock} unit(s) available`, 400));
    }
    item.quantity += 1;
  } else if (type === 'decrease') {
    item.quantity = Math.max(1, item.quantity - 1);
  } else {
    return next(new AppError('type must be "increase" or "decrease"', 400));
  }

  await cart.save();
  await cart.populate('items.product');

  const payload = await buildCartResponse(cart);
  res.status(200).json({ status: 'success', data: { cart: payload } });
});

// DELETE /api/v1/customer/cart/items/:productId
exports.removeItem = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { variantLabel } = req.query;

  const cart = await getOrCreateCart(req.customer._id);
  cart.items = cart.items.filter(
    (item) =>
      !(item.product.toString() === productId && (!variantLabel || item.variantLabel === variantLabel)),
  );

  await cart.save();
  await cart.populate('items.product');

  const payload = await buildCartResponse(cart);
  res.status(200).json({ status: 'success', data: { cart: payload } });
});

// DELETE /api/v1/customer/cart
exports.clearCart = catchAsync(async (req, res, next) => {
  const cart = await getOrCreateCart(req.customer._id);
  cart.items = [];
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: { cart: { _id: cart._id, items: [], subtotal: 0, shipping: 0, total: 0 } },
  });
});

// ─── SHARED HELPER (used by orderController) ────────────────────────────────

exports.getOrCreateCart = getOrCreateCart;
