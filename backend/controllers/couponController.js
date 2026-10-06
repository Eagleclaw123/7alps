const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { resolveCoupon } = require('../utils/coupon');
const { calculateItemsTotal } = require('./orderController');

const COUPON_FIELDS = ['code', 'description', 'discountType', 'discountValue', 'minOrderAmount', 'usageType', 'active'];

// Normalises and sanity-checks the fields an admin can set. Mongoose enforces
// the schema rules on save; this covers the rules that need the whole payload
// (and keeps the error messages readable for the admin form).
const cleanCouponPayload = (body, { partial = false } = {}) => {
  const payload = {};

  COUPON_FIELDS.forEach((field) => {
    if (body[field] !== undefined) payload[field] = body[field];
  });

  if (!partial) {
    if (!payload.code) throw new AppError('Coupon code is required', 400);
    if (!payload.discountType) throw new AppError('Choose a percentage or flat discount', 400);
    if (payload.discountValue === undefined) throw new AppError('Discount value is required', 400);
  }

  if (payload.code !== undefined) payload.code = String(payload.code).trim().toUpperCase();

  if (payload.discountType !== undefined && !['percentage', 'flat'].includes(payload.discountType)) {
    throw new AppError('Discount type must be "percentage" or "flat"', 400);
  }

  if (payload.discountValue !== undefined) {
    const value = Number(payload.discountValue);
    if (!Number.isInteger(value) || value < 1) {
      throw new AppError('Discount value must be a whole number of at least 1', 400);
    }
    payload.discountValue = value;
  }

  if (payload.minOrderAmount !== undefined) {
    const min = Number(payload.minOrderAmount);
    if (!Number.isFinite(min) || min < 0) {
      throw new AppError('Minimum order amount cannot be negative', 400);
    }
    payload.minOrderAmount = min;
  }

  if (payload.usageType !== undefined && !['one-time', 'reusable'].includes(payload.usageType)) {
    throw new AppError('Usage must be "one-time" or "reusable"', 400);
  }

  if (payload.active !== undefined && typeof payload.active !== 'boolean') {
    throw new AppError('active must be a boolean', 400);
  }

  return payload;
};

const ensureCodeAvailable = async (code, exceptId) => {
  const filter = { code, ...(exceptId ? { _id: { $ne: exceptId } } : {}) };
  if (await Coupon.exists(filter)) {
    throw new AppError(`A coupon with the code "${code}" already exists`, 400);
  }
};

// ── Admin ─────────────────────────────────────────────────────────────────────

// GET /api/v1/admin/coupons
exports.getAllCoupons = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find().sort('-createdAt');

  res.status(200).json({ status: 'success', results: coupons.length, data: { coupons } });
});

// POST /api/v1/admin/coupons
exports.createCoupon = catchAsync(async (req, res, next) => {
  const payload = cleanCouponPayload(req.body);
  await ensureCodeAvailable(payload.code);

  const coupon = await Coupon.create(payload);

  res.status(201).json({ status: 'success', data: { coupon } });
});

// PATCH /api/v1/admin/coupons/:id
// Loads and saves the document (rather than findByIdAndUpdate) so the schema's
// "percentage cannot exceed 100" rule sees the full, merged document.
exports.updateCoupon = catchAsync(async (req, res, next) => {
  const payload = cleanCouponPayload(req.body, { partial: true });

  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return next(new AppError('No coupon found with that ID', 404));

  if (payload.code && payload.code !== coupon.code) {
    await ensureCodeAvailable(payload.code, coupon._id);
  }

  coupon.set(payload);
  await coupon.save();

  res.status(200).json({ status: 'success', data: { coupon } });
});

// PATCH /api/v1/admin/coupons/:id/toggle-status
exports.toggleCouponStatus = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return next(new AppError('No coupon found with that ID', 404));

  coupon.active = !coupon.active;
  await coupon.save();

  res.status(200).json({ status: 'success', data: { coupon } });
});

// DELETE /api/v1/admin/coupons/:id
// A coupon that has already been redeemed is only deactivated, never removed,
// so the admin's record of past usage isn't lost. (Orders keep their own
// snapshot of the coupon either way.)
exports.deleteCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return next(new AppError('No coupon found with that ID', 404));

  if (coupon.usedCount > 0) {
    return next(
      new AppError(
        `"${coupon.code}" has been used on ${coupon.usedCount} order(s), so it can't be deleted. Deactivate it instead.`,
        400,
      ),
    );
  }

  await Coupon.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: 'success', data: null });
});

// ── Customer ──────────────────────────────────────────────────────────────────

// GET /api/v1/customer/coupons/available
// Every active coupon, with `usable` flagged per customer so the checkout can
// show one-time coupons this customer has already spent as unavailable.
exports.getAvailableCoupons = catchAsync(async (req, res, next) => {
  const [coupons, usedCodes] = await Promise.all([
    Coupon.find({ active: true }).sort('minOrderAmount'),
    Order.distinct('coupon.code', { customer: req.customer._id, status: { $ne: 'Cancelled' } }),
  ]);

  const usedSet = new Set(usedCodes);

  const available = coupons.map((coupon) => ({
    code: coupon.code,
    description: coupon.description,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    minOrderAmount: coupon.minOrderAmount,
    usageType: coupon.usageType,
    usable: !(coupon.usageType === 'one-time' && usedSet.has(coupon.code)),
  }));

  res.status(200).json({ status: 'success', results: available.length, data: { coupons: available } });
});

// POST /api/v1/customer/coupons/preview
// Body: { code, items? } — `items` for Buy Now, otherwise the saved cart.
// Lets the checkout show the discount before the customer places the order.
// The same rules are enforced again when the order is actually created.
exports.previewCoupon = catchAsync(async (req, res, next) => {
  const { code, items } = req.body;

  const itemsTotal = await calculateItemsTotal(req.customer._id, items);
  const { coupon, discountAmount } = await resolveCoupon({
    code,
    customerId: req.customer._id,
    itemsTotal,
  });

  res.status(200).json({
    status: 'success',
    data: {
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderAmount: coupon.minOrderAmount,
        usageType: coupon.usageType,
      },
      itemsTotal,
      discountAmount,
    },
  });
});
