const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { decrementVariantStock } = require('./productController');

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

const REQUIRED_ADDRESS_FIELDS = ['name', 'phone', 'line1', 'city', 'state', 'pincode'];

// POST /api/v1/customer/orders
exports.createOrder = catchAsync(async (req, res, next) => {
  const { shippingAddress } = req.body;

  if (!shippingAddress || REQUIRED_ADDRESS_FIELDS.some((field) => !shippingAddress[field])) {
    return next(new AppError(`Please provide a complete shipping address (${REQUIRED_ADDRESS_FIELDS.join(', ')})`, 400));
  }

  const cart = await Cart.findOne({ customer: req.customer._id }).populate('items.product');
  if (!cart || !cart.items.length) {
    return next(new AppError('Your cart is empty', 400));
  }

  const session = await mongoose.startSession();
  let order;

  try {
    await session.withTransaction(async () => {
      const orderItems = [];

      for (const cartItem of cart.items) {
        const product = cartItem.product;
        if (!product) throw new AppError('One of the products in your cart no longer exists', 400);

        const variant = product.variants.find((v) => v.label === cartItem.variantLabel);
        if (!variant) throw new AppError(`Variant "${cartItem.variantLabel}" no longer exists for "${product.name}"`, 400);

        await decrementVariantStock(product._id, cartItem.variantLabel, cartItem.quantity, session);

        orderItems.push({
          product: product._id,
          name: product.name,
          variantLabel: cartItem.variantLabel,
          price: variant.price,
          quantity: cartItem.quantity,
          subtotal: variant.price * cartItem.quantity,
        });
      }

      const itemsTotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
      const shippingFee = itemsTotal <= FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
      const totalAmount = itemsTotal + shippingFee;

      const created = await Order.create(
        [
          {
            customer: req.customer._id,
            items: orderItems,
            shippingAddress,
            itemsTotal,
            shippingFee,
            totalAmount,
          },
        ],
        { session },
      );
      order = created[0];

      cart.items = [];
      await cart.save({ session });
    });
  } finally {
    session.endSession();
  }

  res.status(201).json({ status: 'success', data: { order } });
});

// GET /api/v1/customer/orders
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ customer: req.customer._id }).sort('-createdAt');

  res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
});

// GET /api/v1/customer/orders/:id
exports.getMyOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id, customer: req.customer._id });
  if (!order) return next(new AppError('No order found with that ID', 404));

  res.status(200).json({ status: 'success', data: { order } });
});

// GET /api/v1/admin/orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate('customer', 'name mobile').sort('-createdAt');

  res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
});

// GET /api/v1/admin/orders/:id
exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('customer', 'name mobile');
  if (!order) return next(new AppError('No order found with that ID', 404));

  res.status(200).json({ status: 'success', data: { order } });
});

// PATCH /api/v1/admin/orders/:id/status
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (!allowedStatuses.includes(status)) {
    return next(new AppError(`Status must be one of: ${allowedStatuses.join(', ')}`, 400));
  }

  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!order) return next(new AppError('No order found with that ID', 404));

  res.status(200).json({ status: 'success', data: { order } });
});
