import api from "./api";

export const getPublicCategories = () => {
  return api.get("/categories/public");
};

export const getCategories = () => {
  return api.get("/categories");
};

export const createCategory = (payload) => {
  return api.post("/categories", payload);
};

export const updateCategory = (id, payload) => {
  return api.patch(`/categories/${id}`, payload);
};

export const toggleCategoryStatus = (id) => {
  return api.patch(`/categories/${id}/toggle-status`);
};

export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};
