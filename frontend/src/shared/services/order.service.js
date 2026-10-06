import api from "./api";

// `items` (Buy Now) is optional — when provided, the backend builds the order
// from just those items instead of the persisted cart, and never touches it.
// `couponCode` is optional and re-validated by the backend at order time.
export const createOrder = (shippingAddress, items, couponCode) => {
  return api.post("/customer/orders", {
    shippingAddress,
    ...(items ? { items } : {}),
    ...(couponCode ? { couponCode } : {}),
  });
};

export const getMyOrders = () => {
  return api.get("/customer/orders");
};

export const getMyOrder = (id) => {
  return api.get(`/customer/orders/${id}`);
};
