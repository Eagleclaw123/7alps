const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Soap', 'Shampoo', 'Hair Care', 'Skin Care', 'Body Care', 'Other'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    mrp: {
      type: Number,
      min: 0,
    },
    weight: {
      type: String,
      trim: true,
    },
    tags: [String],
    coverImage: {
      type: String,
    },
    images: [String],
    active: {
      type: Boolean,
      default: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    orderCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

const Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;
