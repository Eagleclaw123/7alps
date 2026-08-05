const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

// ── Public ────────────────────────────────────────────────────────────────────

// POST /api/v1/contact
exports.createContact = catchAsync(async (req, res, next) => {
  const {
    fullName,
    email,
    phone,
    companyName,
    productInterest,
    quantityRequirement,
    message,
  } = req.body;

  if (!fullName || !fullName.trim()) {
    return next(new AppError('Please provide your full name', 400));
  }

  if (!phone || !/^\d{10}$/.test(phone.trim())) {
    return next(new AppError('Please provide a valid 10-digit phone number', 400));
  }

  const contact = await Contact.create({
    fullName,
    email,
    phone,
    companyName,
    productInterest,
    quantityRequirement,
    message,
  });

  // Best-effort notification — a failed email must never fail the submission itself.
  if (process.env.CONTACT_NOTIFY_EMAIL) {
    try {
      await sendEmail({
        email: process.env.CONTACT_NOTIFY_EMAIL,
        subject: `New contact form submission from ${fullName}`,
        message: [
          `Name: ${fullName}`,
          `Phone: ${phone}`,
          email ? `Email: ${email}` : null,
          companyName ? `Company: ${companyName}` : null,
          productInterest ? `Product interest: ${productInterest}` : null,
          quantityRequirement ? `Quantity requirement: ${quantityRequirement}` : null,
          message ? `Message: ${message}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
      });
    } catch (err) {
      console.error('Failed to send contact notification email:', err.message);
    }
  }

  res.status(201).json({ status: 'success', data: { contact } });
});

// ── Admin ─────────────────────────────────────────────────────────────────────

// GET /api/v1/admin/contacts
exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find().sort('-createdAt');

  res.status(200).json({ status: 'success', results: contacts.length, data: { contacts } });
});

// PATCH /api/v1/admin/contacts/:id/status
exports.updateContactStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['New', 'Read', 'Resolved'];

  if (!allowedStatuses.includes(status)) {
    return next(new AppError(`Status must be one of: ${allowedStatuses.join(', ')}`, 400));
  }

  const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!contact) return next(new AppError('No contact submission found with that ID', 404));

  res.status(200).json({ status: 'success', data: { contact } });
});

// DELETE /api/v1/admin/contacts/:id
exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) return next(new AppError('No contact submission found with that ID', 404));

  res.status(204).json({ status: 'success', data: null });
});
