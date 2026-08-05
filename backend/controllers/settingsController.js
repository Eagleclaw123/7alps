const Settings = require('../models/settingsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET /api/v1/settings/public
// Just the fields safe to show pre-checkout (e.g. an estimated delivery date
// on the cart page) — never the full settings document.
exports.getPublicSettings = catchAsync(async (req, res, next) => {
  const settings = await Settings.getSingleton();

  res.status(200).json({
    status: 'success',
    data: { expectedDeliveryDays: settings.expectedDeliveryDays },
  });
});

// GET /api/v1/admin/settings
exports.getSettings = catchAsync(async (req, res, next) => {
  const settings = await Settings.getSingleton();

  res.status(200).json({ status: 'success', data: { settings } });
});

// PATCH /api/v1/admin/settings
exports.updateSettings = catchAsync(async (req, res, next) => {
  const { expectedDeliveryDays } = req.body;

  if (expectedDeliveryDays === undefined) {
    return next(new AppError('Please provide expectedDeliveryDays', 400));
  }

  const days = Number(expectedDeliveryDays);
  if (!Number.isInteger(days) || days < 1) {
    return next(new AppError('Expected delivery days must be a whole number of at least 1', 400));
  }

  const settings = await Settings.getSingleton();
  settings.expectedDeliveryDays = days;
  await settings.save();

  res.status(200).json({ status: 'success', data: { settings } });
});
