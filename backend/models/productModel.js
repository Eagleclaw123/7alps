const mongoose = require('mongoose');
const slugify = require('slugify');

const variantSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, 'Variant label is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Variant price is required'],
      min: 0,
    },
    mrp: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

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
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    taglines: [String],
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    keyHighlights: [String],
    ingredients: [String],
    usageSuggestions: [String],
    storageInstructions: {
      type: String,
      trim: true,
    },
    tags: [String],
    variants: {
      type: [variantSchema],
      validate: {
        validator: (variants) => Array.isArray(variants) && variants.length > 0,
        message: 'At least one variant is required',
      },
    },
    images: [String],
    active: {
      type: Boolean,
      default: true,
    },
    orderCount: {
      type: Number,
      default: 0,
    },
    // Admin-entered display rating — NOT computed from Review documents (yet).
    // Storefront-facing "X.X stars from Y people" until real review aggregation
    // is built later; kept independent of the Review collection for now.
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsCount: {
      type: Number,
      default: 0,
      min: [0, 'Ratings count cannot be negative'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual('inStock').get(function () {
  return Array.isArray(this.variants) && this.variants.some((v) => v.stock > 0);
});

productSchema.virtual('minPrice').get(function () {
  if (!Array.isArray(this.variants) || !this.variants.length) return undefined;
  return Math.min(...this.variants.map((v) => v.price));
});

productSchema.virtual('maxPrice').get(function () {
  if (!Array.isArray(this.variants) || !this.variants.length) return undefined;
  return Math.max(...this.variants.map((v) => v.price));
});

productSchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  if (Array.isArray(this.variants) && this.variants.length) {
    if (!this.variants.some((v) => v.isDefault)) {
      this.variants[0].isDefault = true;
    }
  }
});

const Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;
