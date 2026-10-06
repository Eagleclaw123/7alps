import api from "./api";

// `items` (Buy Now) is optional — when provided, the Razorpay order is sized to
// just those items instead of the persisted cart. `shippingAddress` is
// required — the backend rejects the order upfront (before any charge) if the
// state isn't on the admin's serviceable-states allow-list. `couponCode` is
// optional and re-validated by the backend.
export const createRazorpayOrder = (shippingAddress, items, couponCode) => {
  return api.post("/customer/payments/razorpay-order", {
    shippingAddress,
    ...(items ? { items } : {}),
    ...(couponCode ? { couponCode } : {}),
  });
};

export const verifyRazorpayPayment = (payload) => {
  return api.post("/customer/payments/razorpay-verify", payload);
};
