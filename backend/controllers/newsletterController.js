const NewsletterSubscriber = require('../models/newsletterModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/v1/newsletter/subscribe
// Idempotent — resubscribing with the same email just succeeds again rather
// than erroring, since from the visitor's side there's nothing wrong.
exports.subscribe = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return next(new AppError('Please provide a valid email address', 400));
  }

  await NewsletterSubscriber.findOneAndUpdate(
    { email: email.trim().toLowerCase() },
    { email: email.trim().toLowerCase() },
    { upsert: true, setDefaultsOnInsert: true },
  );

  res.status(200).json({ status: 'success', message: 'Subscribed successfully' });
});

// GET /api/v1/admin/newsletter
exports.getAllSubscribers = catchAsync(async (req, res, next) => {
  const subscribers = await NewsletterSubscriber.find().sort('-createdAt');

  res.status(200).json({ status: 'success', results: subscribers.length, data: { subscribers } });
});
