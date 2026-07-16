const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const B2BMember = require('../models/b2bModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id, type: 'b2b' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const B2B_COOKIE_NAME = 'b2bToken';

const b2bCookieOptions = () => ({
  expires: new Date(
    Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000,
  ),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
});

const createSendToken = (member, statusCode, res, additionalData = {}) => {
  const token = signToken(member._id);

  res.cookie(B2B_COOKIE_NAME, token, b2bCookieOptions());
  member.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: {
      member,
      ...additionalData,
    },
  });
};

// POST /api/v1/b2b/login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const member = await B2BMember.findOne({ email: email.toLowerCase() }).select('+password +active');

  if (!member) {
    return next(new AppError('Incorrect email or password', 401));
  }

  if (!member.active) {
    return next(new AppError('Your account has been deactivated. Please contact administrator.', 401));
  }

  if (!(await member.correctPassword(password, member.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  member.lastLoginTime = new Date();
  await member.save({ validateBeforeSave: false });

  createSendToken(member, 200, res, { dashboardURL: '/b2b' });
});

// POST /api/v1/b2b/logout
exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie(B2B_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});

// GET /api/v1/b2b/status
exports.getCurrentStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: { member: req.b2bMember } });
});

// Protect middleware — mirrors authController.protect but for B2BMember docs
exports.protectB2B = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies[B2B_COOKIE_NAME]) {
    token = req.cookies[B2B_COOKIE_NAME];
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (decoded.type !== 'b2b') {
    return next(new AppError('Invalid token for this resource.', 401));
  }

  const currentMember = await B2BMember.findById(decoded.id).select('+active');
  if (!currentMember) {
    return next(new AppError('The account belonging to this token no longer exists.', 401));
  }

  if (!currentMember.active) {
    return next(new AppError('Your account has been deactivated.', 401));
  }

  req.b2bMember = currentMember;
  next();
});
