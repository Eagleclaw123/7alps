import api from "./api";

export const getCoupons = () => {
  return api.get("/admin/coupons");
};

export const createCoupon = (payload) => {
  return api.post("/admin/coupons", payload);
};

export const updateCoupon = (id, payload) => {
  return api.patch(`/admin/coupons/${id}`, payload);
};

export const toggleCouponStatus = (id) => {
  return api.patch(`/admin/coupons/${id}/toggle-status`);
};

export const deleteCoupon = (id) => {
  return api.delete(`/admin/coupons/${id}`);
};

export const getAvailableCoupons = () => {
  return api.get("/customer/coupons/available");
};

export const previewCoupon = (code, items) => {
  return api.post("/customer/coupons/preview", {
    code,
    ...(items ? { items } : {}),
  });
};
