const B2BMember = require('../models/b2bModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Builds a Map of b2bMember id -> { totalOrders, totalSales } from non-cancelled B2B orders.
// `totalSales` is each member's "earnings" — it's only ever non-zero from Orders,
// and an Order only exists once admin has approved that member's quote, so a
// quote's value is attributed to its member automatically at approval time.
// Optionally scoped to a period (e.g. one month) via dateFrom/dateTo.
const getStatsByMember = async ({ dateFrom, dateTo } = {}) => {
  const match = { source: 'B2B', status: { $ne: 'Cancelled' } };

  if (dateFrom || dateTo) {
    match.createdAt = {};
    if (dateFrom) match.createdAt.$gte = new Date(dateFrom);
    if (dateTo) match.createdAt.$lte = new Date(dateTo);
  }

  const stats = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$b2bMember',
        totalOrders: { $sum: 1 },
        totalSales: { $sum: '$totalAmount' },
      },
    },
  ]);

  return new Map(stats.map((s) => [s._id.toString(), { totalOrders: s.totalOrders, totalSales: s.totalSales }]));
};

// POST /api/v1/admin/b2b
exports.createB2BMember = catchAsync(async (req, res, next) => {
  const { name, email, phoneNumber, businessName, password, passwordConfirm } = req.body;

  if (!name || !email || !phoneNumber || !password || !passwordConfirm) {
    return next(new AppError('Please provide name, email, phone number, and password', 400));
  }

  const member = await B2BMember.create({
    name,
    email,
    phoneNumber,
    businessName,
    password,
    passwordConfirm,
  });

  member.password = undefined;

  res.status(201).json({ status: 'success', data: { member } });
});

// GET /api/v1/admin/b2b
// Supports ?dateFrom=2026-08-01&dateTo=2026-08-31 to scope each member's
// order count and earnings to a specific period (e.g. one month).
exports.getAllB2BMembers = catchAsync(async (req, res, next) => {
  const { dateFrom, dateTo } = req.query;
  const members = await B2BMember.find().select('+active').sort('-createdAt');
  const statsByMember = await getStatsByMember({ dateFrom, dateTo });

  const membersWithStats = members.map((member) => {
    const stats = statsByMember.get(member._id.toString()) || { totalOrders: 0, totalSales: 0 };
    return { ...member.toObject(), ...stats };
  });

  res.status(200).json({ status: 'success', results: membersWithStats.length, data: { members: membersWithStats } });
});

// GET /api/v1/admin/b2b/:id
exports.getB2BMember = catchAsync(async (req, res, next) => {
  const member = await B2BMember.findById(req.params.id).select('+active');
  if (!member) {
    return next(new AppError('No B2B member found with that ID', 404));
  }

  const statsByMember = await getStatsByMember();
  const stats = statsByMember.get(member._id.toString()) || { totalOrders: 0, totalSales: 0 };

  res.status(200).json({ status: 'success', data: { member: { ...member.toObject(), ...stats } } });
});

// PATCH /api/v1/admin/b2b/:id
exports.updateB2BMember = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm, ...updateData } = req.body;

  const member = await B2BMember.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!member) {
    return next(new AppError('No B2B member found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: { member } });
});

// DELETE /api/v1/admin/b2b/:id
exports.deleteB2BMember = catchAsync(async (req, res, next) => {
  const member = await B2BMember.findByIdAndUpdate(req.params.id, { active: false }, { new: true });

  if (!member) {
    return next(new AppError('No B2B member found with that ID', 404));
  }

  res.status(204).json({ status: 'success', data: null });
});
