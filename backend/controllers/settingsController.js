const Settings = require('../models/settingsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { INDIAN_STATES } = require('../utils/indianStates');

// GET /api/v1/settings/public
// Just the fields safe to show pre-checkout (e.g. an estimated delivery date
// on the cart page, or the serviceable-states allow-list so the checkout page
// can warn a customer before they even submit) — never the full settings
// document.
exports.getPublicSettings = catchAsync(async (req, res, next) => {
  const settings = await Settings.getSingleton();

  res.status(200).json({
    status: 'success',
    data: {
      expectedDeliveryDays: settings.expectedDeliveryDays,
      serviceableStatesEnabled: settings.serviceableStatesEnabled,
      serviceableStates: settings.serviceableStates,
      codEnabled: settings.codEnabled,
    },
  });
});

// GET /api/v1/admin/settings
exports.getSettings = catchAsync(async (req, res, next) => {
  const settings = await Settings.getSingleton();

  res.status(200).json({ status: 'success', data: { settings } });
});

// PATCH /api/v1/admin/settings
// Each field is independently optional so the delivery-days form and the
// serviceable-states form (separate admin UI sections) can each save without
// clobbering the other's value.
exports.updateSettings = catchAsync(async (req, res, next) => {
  const { expectedDeliveryDays, serviceableStatesEnabled, serviceableStates, codEnabled } = req.body;

  if (
    expectedDeliveryDays === undefined &&
    serviceableStatesEnabled === undefined &&
    serviceableStates === undefined &&
    codEnabled === undefined
  ) {
    return next(new AppError('Please provide at least one setting to update', 400));
  }

  const settings = await Settings.getSingleton();

  if (expectedDeliveryDays !== undefined) {
    const days = Number(expectedDeliveryDays);
    if (!Number.isInteger(days) || days < 1) {
      return next(new AppError('Expected delivery days must be a whole number of at least 1', 400));
    }
    settings.expectedDeliveryDays = days;
  }

  if (serviceableStates !== undefined) {
    if (!Array.isArray(serviceableStates) || serviceableStates.some((s) => !INDIAN_STATES.includes(s))) {
      return next(new AppError('serviceableStates must be an array of valid Indian state/UT names', 400));
    }
    settings.serviceableStates = serviceableStates;
  }

  if (serviceableStatesEnabled !== undefined) {
    if (typeof serviceableStatesEnabled !== 'boolean') {
      return next(new AppError('serviceableStatesEnabled must be a boolean', 400));
    }
    if (serviceableStatesEnabled && settings.serviceableStates.length === 0) {
      return next(new AppError('Select at least one state before enabling this restriction', 400));
    }
    settings.serviceableStatesEnabled = serviceableStatesEnabled;
  }

  if (codEnabled !== undefined) {
    if (typeof codEnabled !== 'boolean') {
      return next(new AppError('codEnabled must be a boolean', 400));
    }
    settings.codEnabled = codEnabled;
  }

  await settings.save();

  res.status(200).json({ status: 'success', data: { settings } });
});
