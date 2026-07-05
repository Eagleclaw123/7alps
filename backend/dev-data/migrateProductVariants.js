const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const CATEGORY_MAP = {
  Soap: 'Health & Wellness',
  Shampoo: 'Hair Care',
  'Hair Care': 'Hair Care',
  'Skin Care': 'Skin Care',
  'Body Care': 'Health & Wellness',
  Other: 'Health & Wellness',
};

const migrate = async () => {
  await mongoose.connect(DB);
  console.log('DB connected');

  const collection = mongoose.connection.collection('Products');
  const products = await collection.find({ variants: { $exists: false } }).toArray();

  console.log(`Found ${products.length} product(s) to migrate.`);

  for (const doc of products) {
    const variant = {
      label: doc.weight || 'Standard',
      price: doc.price ?? 0,
      mrp: doc.mrp,
      stock: doc.inStock === false ? 0 : 50,
      isDefault: true,
    };

    const update = {
      $set: {
        category: CATEGORY_MAP[doc.category] || 'Health & Wellness',
        variants: [variant],
      },
      $unset: { price: '', mrp: '', weight: '', inStock: '' },
    };

    await collection.updateOne({ _id: doc._id }, update);
    console.log(`Migrated: ${doc.name}`);
  }

  console.log('Migration complete.');
  process.exit(0);
};

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
