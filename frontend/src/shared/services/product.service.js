import api from "./api";

// ── Public (no auth) ─────────────────────────────────────────────────────────

export const getPublicProducts = (params) => {
  return api.get("/products/public", { params });
};

export const getPublicProduct = (idOrSlug) => {
  return api.get(`/products/public/${idOrSlug}`);
};

// ── Admin ─────────────────────────────────────────────────────────────────────

export const getProducts = () => {
  return api.get("/products");
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const createProduct = (data) => {
  return api.post("/products", data, {
    headers: data instanceof FormData ? {} : {},
  });
};

export const updateProduct = (id, data) => {
  return api.patch(`/products/${id}`, data);
};

export const toggleProductStatus = (id) => {
  return api.patch(`/products/${id}/toggle-status`);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};
