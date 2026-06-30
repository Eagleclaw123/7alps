import { api } from "./api";

export const productService = {
  getAll: () => api.get("/products"),
  getOne: (id) => api.get(`/products/${id}`),
  create: (formData) => api.post("/products", formData, true),
  update: (id, formData) => api.patch(`/products/${id}`, formData, true),
  toggleStatus: (id) => api.patch(`/products/${id}/toggle-status`),
  delete: (id) => api.delete(`/products/${id}`),
};
