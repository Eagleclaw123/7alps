const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const { otpEmail } = require('../utils/emailTemplates');

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

const signToken = (id) =>
  jwt.sign({ id, type: 'customer' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Short-lived token issued after email verification when the account still
// needs a mobile number — scoped only to the complete-mobile step, not a
// full login session.
const signPendingMobileToken = (id) =>
  jwt.sign({ id, type: 'customer-pending-mobile' }, process.env.JWT_SECRET, {
    expiresIn: '15m',
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

const otpStore = new Map(); // email -> { otp, name, expiresAt }

// POST /api/v1/customer/send-otp
exports.sendOTP = catchAsync(async (req, res, next) => {
  const { email, name } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return next(new AppError('Please provide a valid email address', 400));
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingCustomer = await Customer.findOne({ email: normalizedEmail });
  if (!existingCustomer && !name) {
    return next(new AppError('Please provide your name to create an account', 400));
  }

  const otp = generateOTP();
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  otpStore.set(normalizedEmail, {
    otp: hashedOTP,
    name,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  try {
    const { html, text } = otpEmail({
      heading: 'Verify your email',
      intro: `Use the code below to verify your email and continue to 7ALP's.`,
      otp,
      minutes: 10,
    });

    await sendEmail({
      email: normalizedEmail,
      subject: "7ALP's - Verify Your Email",
      message: text,
      html,
    });
  } catch (err) {
    otpStore.delete(normalizedEmail);
    return next(new AppError('Error sending email. Please try again later.', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'OTP sent successfully.',
  });
});

// POST /api/v1/customer/verify-otp
exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new AppError('Please provide email and OTP', 400));
  }

  const normalizedEmail = email.toLowerCase().trim();

  const record = otpStore.get(normalizedEmail);
  if (!record) {
    return next(new AppError('OTP expired or not requested. Please request a new one.', 400));
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalizedEmail);
    return next(new AppError('OTP has expired. Please request a new one.', 400));
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
  if (hashedOTP !== record.otp) {
    return next(new AppError('Invalid OTP', 400));
  }

  otpStore.delete(normalizedEmail);

  let customer = await Customer.findOne({ email: normalizedEmail });

  if (!customer) {
    customer = await Customer.create({ email: normalizedEmail, name: record.name });
  } else {
    customer.lastLoginTime = new Date();
    await customer.save();
  }

  // Mobile number is required before we hand out a full login session — if
  // it's missing (new signup, or an old signup that never finished), issue a
  // short-lived pending token scoped to the complete-mobile step instead.
  if (!customer.mobile) {
    const pendingToken = signPendingMobileToken(customer._id);
    return res.status(200).json({
      status: 'success',
      data: {
        needsMobile: true,
        pendingToken,
        customer: { _id: customer._id, name: customer.name, email: customer.email },
      },
    });
  }

  createSendToken(customer, 200, res);
});

// POST /api/v1/customer/complete-mobile
// Header: Authorization: Bearer <pendingToken from verify-otp>
exports.completeMobile = catchAsync(async (req, res, next) => {
  const { mobile } = req.body;

  if (!mobile || !INDIAN_MOBILE_REGEX.test(mobile)) {
    return next(new AppError('Please provide a valid Indian mobile number', 400));
  }

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Missing or expired verification session. Please verify your email again.', 401));
  }

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError('Missing or expired verification session. Please verify your email again.', 401));
  }

  if (decoded.type !== 'customer-pending-mobile') {
    return next(new AppError('Invalid verification session.', 401));
  }

  const existingMobile = await Customer.findOne({ mobile });
  if (existingMobile && String(existingMobile._id) !== decoded.id) {
    return next(new AppError('This mobile number is already registered.', 400));
  }

  const customer = await Customer.findById(decoded.id);
  if (!customer) {
    return next(new AppError('Account not found. Please sign up again.', 404));
  }

  customer.mobile = mobile;
  customer.lastLoginTime = new Date();
  await customer.save();

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

// PATCH /api/v1/customer/profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return next(new AppError('Name is required', 400));
  }

  // Email is the verified account identity (set at signup) — not editable here.
  const customer = await Customer.findByIdAndUpdate(
    req.customer._id,
    { name },
    { new: true, runValidators: true },
  );

  res.status(200).json({ status: 'success', data: { customer } });
});

// PATCH /api/v1/customer/addresses
exports.updateAddresses = catchAsync(async (req, res, next) => {
  const { addresses } = req.body;
  if (!Array.isArray(addresses)) {
    return next(new AppError('Please provide an addresses array', 400));
  }

  // Always guarantee exactly one default once at least one address exists —
  // covers both "this is the only address" and "somehow none got marked
  // default" (checkout relies on there being a sensible one to pre-fill from).
  if (addresses.length && !addresses.some((a) => a.isDefault)) {
    addresses[0].isDefault = true;
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
