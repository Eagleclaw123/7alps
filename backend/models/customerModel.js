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
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
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
