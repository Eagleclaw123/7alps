const crypto = require('crypto');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
  buildOrderFromCart,
  buildOrderFromItems,
  calculateItemsTotal,
  priceOrder,
} = require('./orderController');
const { assertStateServiceable } = require('../utils/serviceability');

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
// Creates a Razorpay order sized to the customer's current cart total, UNLESS
// an explicit `items` array is provided (Buy Now) — then it's sized to just
// those items instead, and the cart is never read. Does not touch stock or
// create our own Order yet — that only happens once the payment is verified
// (see verifyRazorpayPayment below), matching how COD only creates the Order
// at the point of a confirmed action.
exports.createRazorpayOrder = catchAsync(async (req, res, next) => {
  const { items, shippingAddress, couponCode } = req.body;

  if (!shippingAddress || REQUIRED_ADDRESS_FIELDS.some((field) => !shippingAddress[field])) {
    return next(new AppError(`Please provide a complete shipping address (${REQUIRED_ADDRESS_FIELDS.join(', ')})`, 400));
  }

  // Checked here — before a Razorpay order (and any charge) is even created —
  // so a customer outside the serviceable area is turned away before paying,
  // not after. Re-checked again in verifyRazorpayPayment below as a guard
  // against the admin's allow-list changing in the few seconds in between.
  await assertStateServiceable(shippingAddress.state);

  // The coupon is re-validated in verifyRazorpayPayment too; pricing here
  // decides how much the customer is charged.
  const itemsTotal = await calculateItemsTotal(req.customer._id, items);
  const { totalAmount } = await priceOrder({ customerId: req.customer._id, itemsTotal, couponCode });

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
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, shippingAddress, items, couponCode } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return next(new AppError('Missing payment verification details', 400));
  }

  if (!shippingAddress || REQUIRED_ADDRESS_FIELDS.some((field) => !shippingAddress[field])) {
    return next(new AppError(`Please provide a complete shipping address (${REQUIRED_ADDRESS_FIELDS.join(', ')})`, 400));
  }

  await assertStateServiceable(shippingAddress.state);

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

  const paymentFields = {
    paymentMethod: 'Razorpay',
    paymentStatus: 'Paid',
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  };

  try {
    await session.withTransaction(async () => {
      order =
        Array.isArray(items) && items.length
          ? await buildOrderFromItems(req.customer._id, shippingAddress, items, session, paymentFields, couponCode)
          : await buildOrderFromCart(req.customer._id, shippingAddress, session, paymentFields, couponCode);
    });
  } finally {
    session.endSession();
  }

  res.status(201).json({ status: 'success', data: { order } });
});
