const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// MongoDB unique-index field names -> user-facing labels
const FRIENDLY_FIELD_NAMES = {
  email: 'email address',
  phone: 'phone number',
  name: 'name',
  slug: 'name',
  sku: 'SKU',
};

const handleDuplicateFieldsDB = (err) => {
  const keyValue = err.keyValue || {};
  const fields = Object.keys(keyValue);

  // Only known compound-unique index in the app: one review per customer per product.
  if (fields.length > 1 && fields.includes('product') && fields.includes('customer')) {
    return new AppError('You have already reviewed this product.', 400);
  }

  const field = fields[0] || 'field';
  const value = keyValue[field] ?? '';
  const label = FRIENDLY_FIELD_NAMES[field] || field;
  const message = `This ${label}${
    value ? ` ("${value}")` : ''
  } is already in use. Please use a different ${label}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err, {
    message: err.message,
  });
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError')
    error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};
