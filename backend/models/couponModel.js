const mongoose = require('mongoose');

// Admin-managed discount codes. A coupon is either a percentage off the items
// total or a flat rupee amount off it, valid only once the items total reaches
// `minOrderAmount`. `usageType` decides whether each customer can redeem it
// once ('one-time') or as often as they like ('reusable').
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9_-]{3,20}$/, 'Coupon code must be 3-20 letters, numbers, dashes or underscores'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [120, 'Description must be at most 120 characters'],
    },
    discountType: {
      type: String,
      enum: ['percentage', 'flat'],
      required: [true, 'Discount type is required'],
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required'],
      min: [1, 'Discount value must be at least 1'],
      validate: {
        validator(value) {
          return this.discountType !== 'percentage' || value <= 100;
        },
        message: 'A percentage discount cannot exceed 100',
      },
    },
    minOrderAmount: {
      type: Number,
      default: 0,
      min: [0, 'Minimum order amount cannot be negative'],
    },
    usageType: {
      type: String,
      enum: ['one-time', 'reusable'],
      default: 'reusable',
    },
    active: {
      type: Boolean,
      default: true,
    },
    // Total number of orders this coupon has been redeemed on. Informational
    // for the admin, and used to block deleting a coupon that has been used.
    usedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Coupon = mongoose.model('Coupon', couponSchema, 'Coupons');

module.exports = Coupon;
