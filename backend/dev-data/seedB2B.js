const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });

const B2BMember = require('../models/b2bModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const seed = async () => {
  await mongoose.connect(DB);
  console.log('DB connected');

  const existing = await B2BMember.findOne({ email: 'b2bpartner@7alps.com' });
  if (existing) {
    console.log('B2B member already exists. Skipping.');
    process.exit(0);
  }

  await B2BMember.create({
    name: 'Marketing Team',
    email: 'b2bpartner@7alps.com',
    phoneNumber: '0000000001',
    businessName: '7Alps Wholesale Partner',
    password: '7alps123',
    passwordConfirm: '7alps123',
  });

  console.log('B2B member seeded successfully!');
  console.log('  Email   : b2bpartner@7alps.com');
  console.log('  Password: 7alps123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
