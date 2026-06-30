const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });

const Admin = require('../models/adminModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const seed = async () => {
  await mongoose.connect(DB);
  console.log('DB connected');

  const existing = await Admin.findOne({ Email: '7alpsadmin@7alps.com' });
  if (existing) {
    console.log('Admin already exists. Skipping.');
    process.exit(0);
  }

  await Admin.create({
    Name: '7Alps Admin',
    Email: '7alpsadmin@7alps.com',
    PhoneNumber: '0000000000',
    role: 'SuperAdmin',
    password: '7alps123',
    passwordConfirm: '7alps123',
  });

  console.log('Admin seeded successfully!');
  console.log('  Email   : 7alpsadmin@7alps.com');
  console.log('  Password: 7alps123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
