const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');

dotenv.config({ path: './.env' });

const sampleProducts = [
  {
    name: 'Herbal Shampoo',
    category: 'Hair Care',
    subCategory: 'Shampoo',
    description: 'Premium herbal shampoo for healthy hair',
    shortDescription: 'Natural herbal formulation for hair care',
    taglines: ['Chemical-free', 'Gentle on hair'],
    keyHighlights: ['100% natural', 'Cruelty-free', 'Sulfate-free'],
    ingredients: ['Neem', 'Tulsi', 'Coconut oil'],
    usageSuggestions: ['Use 2-3 times a week', 'Apply to scalp and hair'],
    storageInstructions: 'Keep in cool, dry place',
    tags: ['organic', 'herbal', 'natural'],
    variants: [
      {
        label: '200ml',
        price: 299,
        mrp: 399,
        stock: 50,
        isDefault: true,
      },
      {
        label: '500ml',
        price: 599,
        mrp: 799,
        stock: 30,
        isDefault: false,
      },
    ],
    active: true,
  },
  {
    name: 'Vitamin C Face Serum',
    category: 'Skin Care',
    subCategory: 'Serum',
    description: 'Brightening vitamin C serum for glowing skin',
    shortDescription: 'Powerful brightening serum with vitamin C',
    taglines: ['Brightens skin', 'Anti-aging'],
    keyHighlights: ['20% Vitamin C', 'Fast-absorbing', 'Lightweight'],
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Ferulic Acid'],
    usageSuggestions: ['Use morning and night', 'Apply to clean skin'],
    storageInstructions: 'Store in cool place, away from sunlight',
    tags: ['brightening', 'vitamin-c', 'skincare'],
    variants: [
      {
        label: '30ml',
        price: 899,
        mrp: 1299,
        stock: 40,
        isDefault: true,
      },
    ],
    active: true,
  },
  {
    name: 'Organic Turmeric Powder',
    category: 'Health & Wellness',
    subCategory: 'Powder',
    description: 'Pure organic turmeric powder for health and wellness',
    shortDescription: 'High-quality organic turmeric for daily use',
    taglines: ['100% Pure', 'Organic certified'],
    keyHighlights: ['No additives', 'Laboratory tested', 'Farm fresh'],
    ingredients: ['Turmeric root'],
    usageSuggestions: ['Mix 1 tsp in warm milk', 'Use in cooking'],
    storageInstructions: 'Keep in airtight container',
    tags: ['organic', 'wellness', 'turmeric'],
    variants: [
      {
        label: '100g',
        price: 199,
        mrp: 299,
        stock: 100,
        isDefault: true,
      },
      {
        label: '250g',
        price: 449,
        mrp: 599,
        stock: 60,
        isDefault: false,
      },
    ],
    active: true,
  },
  {
    name: 'Hair Growth Oil',
    category: 'Hair Care',
    subCategory: 'Oil',
    description: 'Ayurvedic hair growth oil for thicker, stronger hair',
    shortDescription: 'Natural hair growth oil with Ayurvedic herbs',
    taglines: ['Promotes growth', 'Reduces hair fall'],
    keyHighlights: ['Ayurvedic formula', 'No mineral oil', 'Strengthens roots'],
    ingredients: ['Brahmi', 'Bhringraj', 'Coconut oil', 'Sesame oil'],
    usageSuggestions: ['Massage into scalp', 'Leave overnight'],
    storageInstructions: 'Keep away from heat and sunlight',
    tags: ['hair-growth', 'oil', 'ayurvedic'],
    variants: [
      {
        label: '100ml',
        price: 349,
        mrp: 499,
        stock: 45,
        isDefault: true,
      },
      {
        label: '250ml',
        price: '749',
        mrp: 999,
        stock: 25,
        isDefault: false,
      },
    ],
    active: true,
  },
];

const seedProducts = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD,
    );

    await mongoose.connect(DB);
    console.log('✅ Database connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const created = await Product.insertMany(sampleProducts);
    console.log(`✅ ${created.length} products created successfully`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding products:', err.message);
    process.exit(1);
  }
};

seedProducts();
