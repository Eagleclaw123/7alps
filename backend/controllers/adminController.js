const Admin = require('../models/adminModel');
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
  const totalAdmins = await Admin.countDocuments({ active: true });

  res.status(200).json({
    status: 'success',
    data: { totalAdmins },
  });
});
