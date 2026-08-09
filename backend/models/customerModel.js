const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, default: 'Home' },
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: String,
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    // Set once, right after mobile-collection completes post-signup — not
    // required at document-creation time since the account is created at
    // email-OTP-verify, before the mobile step runs (see
    // customerAuthController.verifyOTP / completeMobile). `sparse` lets
    // multiple in-progress signups coexist without colliding on `null`.
    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid Indian mobile number'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    addresses: [addressSchema],
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    lastLoginTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Customer = mongoose.model('Customer', customerSchema, 'Customers');

module.exports = Customer;
