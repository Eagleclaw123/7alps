import api from "./api";

export const getCart = () => {
  return api.get("/customer/cart");
};

export const addCartItem = (productId, variantLabel, quantity = 1) => {
  return api.post("/customer/cart/items", { productId, variantLabel, quantity });
};

export const updateCartItemQuantity = (productId, variantLabel, type) => {
  return api.patch(`/customer/cart/items/${productId}`, { variantLabel, type });
};

export const removeCartItem = (productId, variantLabel) => {
  return api.delete(`/customer/cart/items/${productId}`, {
    params: { variantLabel },
  });
};

export const clearServerCart = () => {
  return api.delete("/customer/cart");
};
