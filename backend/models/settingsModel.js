const mongoose = require('mongoose');

// Single-document collection for platform-wide, admin-configurable settings.
const settingsSchema = new mongoose.Schema(
  {
    expectedDeliveryDays: {
      type: Number,
      default: 5,
      min: [1, 'Expected delivery days must be at least 1'],
    },
  },
  { timestamps: true },
);

// Atomic upsert so concurrent first-reads never create duplicate singleton docs.
settingsSchema.statics.getSingleton = async function () {
  return this.findOneAndUpdate(
    {},
    { $setOnInsert: { expectedDeliveryDays: 5 } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
};

const Settings = mongoose.model('Settings', settingsSchema, 'Settings');

module.exports = Settings;
