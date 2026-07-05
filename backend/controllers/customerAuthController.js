const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id, type: 'customer' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const CUSTOMER_COOKIE_NAME = 'customerToken';

const customerCookieOptions = () => ({
  expires: new Date(
    Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000,
  ),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
});

const createSendToken = (customer, statusCode, res, additionalData = {}) => {
  const token = signToken(customer._id);

  res.cookie(CUSTOMER_COOKIE_NAME, token, customerCookieOptions());

  res.status(statusCode).json({
    status: 'success',
    data: {
      customer,
      ...additionalData,
    },
  });
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// No SMS gateway configured yet (mirrors the payment layer — deferred).
// Logs the OTP to the console in non-production so the flow can be tested end-to-end.
const sendSMS = async (mobile, otp) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DEV OTP] ${mobile}: ${otp}`);
  }
  // TODO: wire a real SMS provider (e.g. MSG91, Twilio) here.
};

// Universal fallback OTP while no SMS provider is wired up — remove once one is.
const DEFAULT_OTP = '123456';

const otpStore = new Map(); // mobile -> { otp, name, expiresAt }

// POST /api/v1/customer/send-otp
exports.sendOTP = catchAsync(async (req, res, next) => {
  const { mobile, name } = req.body;

  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return next(new AppError('Please provide a valid 10-digit mobile number', 400));
  }

  const existingCustomer = await Customer.findOne({ mobile });
  if (!existingCustomer && !name) {
    return next(new AppError('Please provide your name to create an account', 400));
  }

  const otp = generateOTP();
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  otpStore.set(mobile, {
    otp: hashedOTP,
    name,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  await sendSMS(mobile, otp);

  res.status(200).json({
    status: 'success',
    message: 'OTP sent successfully.',
  });
});

// POST /api/v1/customer/verify-otp
exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return next(new AppError('Please provide mobile number and OTP', 400));
  }

  const record = otpStore.get(mobile);
  if (!record) {
    return next(new AppError('OTP expired or not requested. Please request a new one.', 400));
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobile);
    return next(new AppError('OTP has expired. Please request a new one.', 400));
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
  if (otp !== DEFAULT_OTP && hashedOTP !== record.otp) {
    return next(new AppError('Invalid OTP', 400));
  }

  otpStore.delete(mobile);

  let customer = await Customer.findOne({ mobile });

  if (!customer) {
    customer = await Customer.create({ mobile, name: record.name });
  } else {
    customer.lastLoginTime = new Date();
    await customer.save();
  }

  createSendToken(customer, 200, res);
});

// GET /api/v1/customer/status
exports.getCurrentCustomerStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: { customer: req.customer } });
});

// POST /api/v1/customer/logout
exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie(CUSTOMER_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});

// PATCH /api/v1/customer/addresses
exports.updateAddresses = catchAsync(async (req, res, next) => {
  const { addresses } = req.body;
  if (!Array.isArray(addresses)) {
    return next(new AppError('Please provide an addresses array', 400));
  }

  const customer = await Customer.findByIdAndUpdate(
    req.customer._id,
    { addresses },
    { new: true, runValidators: true },
  );

  res.status(200).json({ status: 'success', data: { customer } });
});

// Protect middleware — mirrors authController.protect but for Customer docs
exports.protectCustomer = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies[CUSTOMER_COOKIE_NAME]) {
    token = req.cookies[CUSTOMER_COOKIE_NAME];
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (decoded.type !== 'customer') {
    return next(new AppError('Invalid token for this resource.', 401));
  }

  const currentCustomer = await Customer.findById(decoded.id).select('+active');
  if (!currentCustomer) {
    return next(new AppError('The customer belonging to this token no longer exists.', 401));
  }

  if (!currentCustomer.active) {
    return next(new AppError('Your account has been deactivated.', 401));
  }

  req.customer = currentCustomer;
  next();
});
