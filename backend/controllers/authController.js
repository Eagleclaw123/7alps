const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const mongoose = require('mongoose');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const ADMIN_COOKIE_NAME = 'adminToken';

const createSendToken = (user, statusCode, res, additionalData = {}) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res.cookie(ADMIN_COOKIE_NAME, token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      ...additionalData,
    },
  });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const signupOTPs = new Map();

// Signup - Step 1: Send OTP
exports.signupSendOTP = catchAsync(async (req, res, next) => {
  const { email, name, phoneNumber, role } = req.body;

  if (!email || !name || !phoneNumber) {
    return next(new AppError('Please provide email, name, and phone number', 400));
  }

  const allowedRoles = ['Admin', 'SuperAdmin'];
  const userRole = role || 'Admin';
  if (!allowedRoles.includes(userRole)) {
    return next(new AppError('Invalid role. Only Admin or SuperAdmin allowed', 400));
  }

  const existingAdmin = await Admin.findOne({ Email: email });
  if (existingAdmin) {
    return next(new AppError('User with this email already exists', 400));
  }

  const otp = generateOTP();
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  signupOTPs.set(email, {
    otp: hashedOTP,
    name,
    phoneNumber,
    role: userRole,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  try {
    await sendEmail({
      email,
      subject: '7Alps - Verify Your Email',
      message: `Your verification code is: ${otp}\n\nThis code will expire in 10 minutes.`,
    });

    res.status(200).json({
      status: 'success',
      message: 'OTP sent to email. Please verify to complete signup.',
    });
  } catch (err) {
    signupOTPs.delete(email);
    return next(new AppError('Error sending email. Please try again later.', 500));
  }
});

// Signup - Step 2: Verify OTP and create account
exports.signupVerifyOTP = catchAsync(async (req, res, next) => {
  const { email, otp, password, passwordConfirm } = req.body;

  if (!email || !otp || !password || !passwordConfirm) {
    return next(new AppError('Please provide email, OTP, password, and password confirmation', 400));
  }

  const signupData = signupOTPs.get(email);
  if (!signupData) {
    return next(new AppError('OTP expired or invalid. Please request a new one.', 400));
  }

  if (Date.now() > signupData.expiresAt) {
    signupOTPs.delete(email);
    return next(new AppError('OTP has expired. Please request a new one.', 400));
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
  if (hashedOTP !== signupData.otp) {
    return next(new AppError('Invalid OTP', 400));
  }

  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  const newAdmin = await Admin.create({
    Name: signupData.name,
    Email: email,
    PhoneNumber: signupData.phoneNumber,
    role: signupData.role,
    password,
    passwordConfirm,
  });

  signupOTPs.delete(email);

  createSendToken(newAdmin, 201, res, { message: 'Account created successfully!' });
});

// Signup - Resend OTP
exports.signupResendOTP = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide email', 400));
  }

  const signupData = signupOTPs.get(email);
  if (!signupData) {
    return next(new AppError('No pending signup found for this email.', 400));
  }

  const otp = generateOTP();
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  signupOTPs.set(email, {
    ...signupData,
    otp: hashedOTP,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  try {
    await sendEmail({
      email,
      subject: '7Alps - New Verification Code',
      message: `Your new verification code is: ${otp}\n\nThis code will expire in 10 minutes.`,
    });

    res.status(200).json({ status: 'success', message: 'New OTP sent to email.' });
  } catch (err) {
    return next(new AppError('Error sending email. Please try again later.', 500));
  }
});

// Login - Admin only
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await Admin.findOne({ Email: email }).select('+password +active');

  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  if (!user.active) {
    return next(new AppError('Your account has been deactivated. Please contact administrator.', 401));
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  user.lastLoginTime = new Date();
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res, {
    dashboardURL: '/admin',
    lastLoginTime: user.lastLoginTime,
  });
});

// Logout
exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie(ADMIN_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});

// Get current user status
exports.getCurrentUserStatus = catchAsync(async (req, res, next) => {
  const user = await Admin.findById(req.user._id).select('+active');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ status: 'success', data: { user } });
});

// Protect middleware
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies[ADMIN_COOKIE_NAME]) {
    token = req.cookies[ADMIN_COOKIE_NAME];
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await Admin.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  req.user = currentUser;
  next();
});

// Role restriction middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

// Forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await Admin.findOne({ Email: email });
  if (!user) {
    return next(new AppError('No user found with this email address.', 404));
  }

  const otp = generateOTP();
  user.passwordResetToken = crypto.createHash('sha256').update(otp).digest('hex');
  user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.Email,
      subject: 'Your Password Reset OTP (valid for 5 minutes)',
      message: `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes.`,
    });

    res.status(200).json({ status: 'success', message: 'OTP sent to email!' });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

// Verify OTP
exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  const hashedToken = crypto.createHash('sha256').update(otp).digest('hex');

  const user = await Admin.findOne({
    Email: email,
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Invalid or expired OTP', 400));
  }

  res.status(200).json({ status: 'success', message: 'OTP verified successfully' });
});

// Reset password after OTP verification
exports.resetPasswordAfterOTP = catchAsync(async (req, res, next) => {
  const { email, otp, password, passwordConfirm } = req.body;

  if (!email || !otp || !password || !passwordConfirm) {
    return next(new AppError('Please provide email, OTP, password, and password confirmation', 400));
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  const user = await Admin.findOne({
    Email: email,
    passwordResetToken: hashedOTP,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Invalid or expired OTP. Please start the reset process again.', 400));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

// Reset password via token
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

// Update password from profile
exports.updatePasswordFromProfile = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new AppError('Please provide all password fields', 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError('New passwords do not match', 400));
  }

  const user = await Admin.findById(req.user.id).select('+password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('Current password is incorrect', 401));
  }

  user.password = newPassword;
  user.passwordConfirm = confirmPassword;
  await user.save();

  createSendToken(user, 200, res);
});

// Health check
exports.healthCheck = catchAsync(async (req, res, next) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    data: {
      server: 'up',
      database: dbStatus[dbState],
      timestamp: new Date().toISOString(),
    },
  });
});
