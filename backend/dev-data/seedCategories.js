const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });

const Category = require('../models/categoryModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const categories = [
  { name: 'Hair Care', description: 'Natural powders and oils for hair health.' },
  { name: 'Skin Care', description: 'Natural face packs and skincare powders.' },
  { name: 'Health & Wellness', description: 'Natural powders for everyday wellness.' },
];

const seed = async () => {
  await mongoose.connect(DB);
  console.log('DB connected');

  for (const data of categories) {
    const existing = await Category.findOne({ name: data.name });
    if (existing) {
      console.log(`Skipping (already exists): ${data.name}`);
      continue;
    }
    const category = await Category.create(data);
    console.log(`Created: ${category.name} (${category.slug})`);
  }

  console.log('Category seeding complete.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
