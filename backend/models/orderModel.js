const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String },
    variantLabel: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
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

const orderSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ['Customer', 'B2B'],
      default: 'Customer',
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
    },
    b2bMember: {
      type: mongoose.Schema.ObjectId,
      ref: 'B2BMember',
    },
    quote: {
      type: mongoose.Schema.ObjectId,
      ref: 'Quote',
    },
    buyerBusinessName: {
      type: String,
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'An order must have at least one item',
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    itemsTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Razorpay'],
      default: 'COD',
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    placedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

orderSchema.pre('validate', function () {
  if (!this.customer && !this.b2bMember) {
    throw new Error('Order must belong to either a customer or a B2B member');
  }
});

const Order = mongoose.model('Order', orderSchema, 'Orders');

module.exports = Order;
