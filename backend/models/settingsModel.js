const mongoose = require('mongoose');

// Single-document collection for platform-wide, admin-configurable settings.
const settingsSchema = new mongoose.Schema(
  {
    expectedDeliveryDays: {
      type: Number,
      default: 5,
      min: [1, 'Expected delivery days must be at least 1'],
    },
    // When true, only customers whose shipping address state appears in
    // `serviceableStates` may place an order — everyone else is turned away
    // with a "not accepted in your area" message. When false (default),
    // orders are accepted from anywhere, same as before this feature existed.
    serviceableStatesEnabled: {
      type: Boolean,
      default: false,
    },
    serviceableStates: {
      type: [String],
      default: [],
    },
    // When false, Cash on Delivery is hidden at checkout and rejected
    // server-side — customers can only pay online. Default true preserves
    // existing behavior.
    codEnabled: {
      type: Boolean,
      default: true,
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
