const Admin = require('../models/adminModel');
const Customer = require('../models/customerModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all admins
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admin.find({ active: true });

  res.status(200).json({
    status: 'success',
    results: admins.length,
    data: { admins },
  });
});

// Get single admin
exports.getAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new AppError('No admin found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { admin },
  });
});

// Update admin
exports.updateAdmin = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm, ...updateData } = req.body;

  const admin = await Admin.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!admin) {
    return next(new AppError('No admin found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { admin },
  });
});

// Deactivate admin (soft delete)
exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, { active: false }, { new: true });

  if (!admin) {
    return next(new AppError('No admin found with that ID', 404));
  }

  res.status(204).json({ status: 'success', data: null });
});

// Dashboard stats
exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const [totalAdmins, totalCustomers, totalProducts, orderStats] = await Promise.all([
    Admin.countDocuments({ active: true }),
    Customer.countDocuments(),
    Product.countDocuments({ active: true }),
    Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: '$totalAmount' } } },
    ]),
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      totalAdmins,
      totalCustomers,
      totalProducts,
      totalOrders: orderStats[0]?.totalOrders || 0,
      totalRevenue: orderStats[0]?.totalRevenue || 0,
    },
  });
});

// GET /api/v1/admin/customers
exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const [customers, orderStats] = await Promise.all([
    Customer.find().select('+active').sort('-createdAt'),
    Order.aggregate([
      { $match: { source: 'Customer', status: { $ne: 'Cancelled' } } },
      { $group: { _id: '$customer', totalOrders: { $sum: 1 }, totalSpent: { $sum: '$totalAmount' } } },
    ]),
  ]);

  const statsByCustomer = new Map(
    orderStats.map((s) => [s._id.toString(), { totalOrders: s.totalOrders, totalSpent: s.totalSpent }]),
  );

  const customersWithStats = customers.map((customer) => {
    const stats = statsByCustomer.get(customer._id.toString()) || { totalOrders: 0, totalSpent: 0 };
    return { ...customer.toObject(), ...stats };
  });

  res.status(200).json({
    status: 'success',
    results: customersWithStats.length,
    data: { customers: customersWithStats },
  });
});
