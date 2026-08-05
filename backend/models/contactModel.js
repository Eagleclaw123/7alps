const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    productInterest: {
      type: String,
      trim: true,
    },
    quantityRequirement: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['New', 'Read', 'Resolved'],
      default: 'New',
    },
  },
  { timestamps: true },
);

const Contact = mongoose.model('Contact', contactSchema, 'Contacts');

module.exports = Contact;
