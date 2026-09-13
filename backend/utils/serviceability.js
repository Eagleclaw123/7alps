const Settings = require('../models/settingsModel');
const AppError = require('./appError');

const normalize = (value) => (value || '').trim().toLowerCase();

// Shared by orderController (COD) and paymentController (Razorpay) so both
// checkout paths enforce the exact same admin-configured state allow-list.
// Returns { serviceable, allowedStates } — allowedStates is only meaningful
// (and only needed) when serviceable is false, to build the error message.
exports.checkStateServiceability = async (state) => {
  const settings = await Settings.getSingleton();

  if (!settings.serviceableStatesEnabled) {
    return { serviceable: true, allowedStates: [] };
  }

  const normalizedState = normalize(state);
  const serviceable = settings.serviceableStates.some((allowed) => normalize(allowed) === normalizedState);

  return { serviceable, allowedStates: settings.serviceableStates };
};

// Throws a 422 with a message naming the customer's state and the currently
// serviceable list, if that state isn't on the admin's allow-list. No-op
// (resolves silently) when the restriction is off or the state is allowed.
exports.assertStateServiceable = async (state) => {
  const { serviceable, allowedStates } = await exports.checkStateServiceability(state);

  if (!serviceable) {
    throw new AppError(
      `Sorry, we don't currently accept orders from ${state}. We're currently delivering to: ${allowedStates.join(', ')}.`,
      422,
    );
  }
};
