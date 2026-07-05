import api from "./api";

export const createOrder = (shippingAddress) => {
  return api.post("/customer/orders", { shippingAddress });
};

export const getMyOrders = () => {
  return api.get("/customer/orders");
};

export const getMyOrder = (id) => {
  return api.get(`/customer/orders/${id}`);
};
