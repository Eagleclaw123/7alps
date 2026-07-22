const mongoose = require('mongoose');

const MIN_BULK_QUANTITY = 10;

const quoteItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String },
    variantLabel: { type: String, required: true },
    quantity: {
      type: Number,
      required: true,
      min: [MIN_BULK_QUANTITY, `Bulk quantity must be at least ${MIN_BULK_QUANTITY} units`],
    },
    proposedPrice: {
      type: Number,
      required: true,
      min: [0, 'Proposed price cannot be negative'],
    },
    subtotal: { type: Number, required: true },
  },
  { _id: false },
);

const shippingAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false },
);

const quoteSchema = new mongoose.Schema(
  {
    b2bMember: {
      type: mongoose.Schema.ObjectId,
      ref: 'B2BMember',
      required: true,
    },
    items: {
      type: [quoteItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'A quote must have at least one item',
      },
    },
    buyerBusinessName: {
      type: String,
      required: [true, 'Buyer business name is required'],
      trim: true,
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    rejectionReason: String,
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Admin',
    },
    reviewedAt: Date,
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
  },
  { timestamps: true },
);

const Quote = mongoose.model('Quote', quoteSchema, 'Quotes');

module.exports = Quote;
module.exports.MIN_BULK_QUANTITY = MIN_BULK_QUANTITY;
