import api from "./api";

export const createRazorpayOrder = () => {
  return api.post("/customer/payments/razorpay-order");
};

export const verifyRazorpayPayment = (payload) => {
  return api.post("/customer/payments/razorpay-verify", payload);
};
