const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });

const Coupon = require('../models/couponModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Sample coupons for testing checkout. Additive only: a coupon whose code
// already exists is skipped, so re-running this never edits or deletes data.
const coupons = [
  {
    code: 'WELCOME10',
    description: '10% off your first order over ₹499',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 499,
    usageType: 'one-time',
  },
  {
    code: 'FLAT100',
    description: '₹100 off orders of ₹999 and above',
    discountType: 'flat',
    discountValue: 100,
    minOrderAmount: 999,
    usageType: 'one-time',
  },
  {
    code: 'SAVE20',
    description: '20% off orders of ₹1499 and above',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 1499,
    usageType: 'reusable',
  },
  {
    code: 'FLAT50',
    description: '₹50 off orders of ₹499 and above',
    discountType: 'flat',
    discountValue: 50,
    minOrderAmount: 499,
    usageType: 'reusable',
  },
];

const seed = async () => {
  await mongoose.connect(DB);
  console.log('DB connected');

  for (const data of coupons) {
    const existing = await Coupon.findOne({ code: data.code });
    if (existing) {
      console.log(`Skipping (already exists): ${data.code}`);
      continue;
    }
    const coupon = await Coupon.create(data);
    console.log(`Created: ${coupon.code} (${coupon.discountType}, ${coupon.usageType})`);
  }

  console.log('Coupon seeding complete.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
