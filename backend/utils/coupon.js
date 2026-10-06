const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const AppError = require('./appError');

// Pure: how many rupees a coupon takes off a given items total. Percentage
// discounts are rounded to whole rupees, and no coupon can take the items
// total below zero. Shipping is never discounted.
exports.calculateDiscount = (coupon, itemsTotal) => {
  const raw =
    coupon.discountType === 'percentage'
      ? Math.round((itemsTotal * coupon.discountValue) / 100)
      : coupon.discountValue;

  return Math.min(raw, itemsTotal);
};

// Checks a coupon code against the customer and the items total, and returns
// the coupon plus the discount it gives. Used by the checkout preview, the
// Razorpay order creation, and — inside the order transaction — by the COD and
// Razorpay-verify paths, so the discount is always re-checked at order time.
exports.resolveCoupon = async ({ code, customerId, itemsTotal, session }) => {
  const normalized = String(code || '').trim().toUpperCase();
  if (!normalized) {
    throw new AppError('Please enter a coupon code', 400);
  }

  const coupon = await Coupon.findOne({ code: normalized }).session(session);
  if (!coupon || !coupon.active) {
    throw new AppError(`The coupon "${normalized}" is invalid or no longer active`, 400);
  }

  if (itemsTotal < coupon.minOrderAmount) {
    const shortBy = coupon.minOrderAmount - itemsTotal;
    throw new AppError(
      `Add ₹${shortBy.toLocaleString('en-IN')} more to your order to use "${coupon.code}" (minimum ₹${coupon.minOrderAmount.toLocaleString('en-IN')})`,
      400,
    );
  }

  if (coupon.usageType === 'one-time') {
    // Cancelled orders don't count, so a cancelled order frees the coupon up.
    const alreadyUsed = await Order.exists({
      customer: customerId,
      'coupon.code': coupon.code,
      status: { $ne: 'Cancelled' },
    }).session(session);

    if (alreadyUsed) {
      throw new AppError(`You have already used the coupon "${coupon.code}"`, 400);
    }
  }

  return { coupon, discountAmount: exports.calculateDiscount(coupon, itemsTotal) };
};

// Snapshot stored on the Order so later edits or deletes of the coupon don't
// change what the customer was actually charged.
exports.toOrderSnapshot = (coupon, discountAmount) => ({
  code: coupon.code,
  description: coupon.description,
  discountType: coupon.discountType,
  discountValue: coupon.discountValue,
  discountAmount,
});
