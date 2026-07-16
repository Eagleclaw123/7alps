const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      minlength: [5, 'Review comment must be at least 5 characters'],
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['Pending', 'Published', 'Flagged'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

// One review per customer per product.
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema, 'Reviews');

module.exports = Review;
