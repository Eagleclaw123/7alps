import api from "./api";

// `items` (Buy Now) is optional — when provided, the Razorpay order is sized
// to just those items instead of the persisted cart.
export const createRazorpayOrder = (items) => {
  return api.post(
    "/customer/payments/razorpay-order",
    items ? { items } : {},
  );
};

export const verifyRazorpayPayment = (payload) => {
  return api.post("/customer/payments/razorpay-verify", payload);
};
