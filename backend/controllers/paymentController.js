const crypto = require('crypto');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { buildOrderFromCart } = require('./orderController');

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;
const REQUIRED_ADDRESS_FIELDS = ['name', 'phone', 'line1', 'city', 'state', 'pincode'];

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new AppError(
      'Online payments are not configured yet. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to the server .env, or choose Cash on Delivery.',
      503,
    );
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// POST /api/v1/customer/payments/razorpay-order
// Creates a Razorpay order sized to the customer's current cart total. Does not
// touch stock or create our own Order yet — that only happens once the payment
// is verified (see verifyRazorpayPayment below), matching how COD only creates
// the Order at the point of a confirmed action.
exports.createRazorpayOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ customer: req.customer._id }).populate('items.product');
  if (!cart || !cart.items.length) {
    return next(new AppError('Your cart is empty', 400));
  }

  let itemsTotal = 0;
  for (const cartItem of cart.items) {
    const product = cartItem.product;
    if (!product) return next(new AppError('One of the products in your cart no longer exists', 400));

    const variant = product.variants.find((v) => v.label === cartItem.variantLabel);
    if (!variant) {
      return next(new AppError(`Variant "${cartItem.variantLabel}" no longer exists for "${product.name}"`, 400));
    }

    itemsTotal += variant.price * cartItem.quantity;
  }

  const shippingFee = itemsTotal <= FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const totalAmount = itemsTotal + shippingFee;

  const razorpay = getRazorpayInstance();
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(totalAmount * 100), // paise
    currency: 'INR',
    // Razorpay caps `receipt` at 40 chars — keep it short but still traceable.
    receipt: `c_${req.customer._id.toString().slice(-10)}_${Date.now()}`,
  });

  res.status(200).json({
    status: 'success',
    data: {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    },
  });
});

// POST /api/v1/customer/payments/razorpay-verify
// Verifies the payment signature Razorpay's checkout returns, then creates the
// real Order (decrementing stock, clearing the cart) exactly like the COD path.
exports.verifyRazorpayPayment = catchAsync(async (req, res, next) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, shippingAddress } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return next(new AppError('Missing payment verification details', 400));
  }

  if (!shippingAddress || REQUIRED_ADDRESS_FIELDS.some((field) => !shippingAddress[field])) {
    return next(new AppError(`Please provide a complete shipping address (${REQUIRED_ADDRESS_FIELDS.join(', ')})`, 400));
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return next(new AppError('Online payments are not configured yet.', 503));
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  if (expectedSignature !== razorpaySignature) {
    return next(new AppError('Payment verification failed. Please contact support if the amount was debited.', 400));
  }

  const session = await mongoose.startSession();
  let order;

  try {
    await session.withTransaction(async () => {
      order = await buildOrderFromCart(req.customer._id, shippingAddress, session, {
        paymentMethod: 'Razorpay',
        paymentStatus: 'Paid',
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });
    });
  } finally {
    session.endSession();
  }

  res.status(201).json({ status: 'success', data: { order } });
});
