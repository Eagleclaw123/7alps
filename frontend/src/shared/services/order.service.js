import api from "./api";

// `items` (Buy Now) is optional — when provided, the backend builds the order
// from just those items instead of the persisted cart, and never touches it.
export const createOrder = (shippingAddress, items) => {
  return api.post("/customer/orders", {
    shippingAddress,
    ...(items ? { items } : {}),
  });
};

export const getMyOrders = () => {
  return api.get("/customer/orders");
};

export const getMyOrder = (id) => {
  return api.get(`/customer/orders/${id}`);
};
