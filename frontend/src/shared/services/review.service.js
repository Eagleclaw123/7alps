import api from "./api";

// ── Public ────────────────────────────────────────────────────────────────────

export const getProductReviews = (idOrSlug) => {
  return api.get(`/products/public/${idOrSlug}/reviews`);
};

// ── Customer ──────────────────────────────────────────────────────────────────

export const createReview = (payload) => {
  return api.post("/customer/reviews", payload);
};

export const getMyReviews = () => {
  return api.get("/customer/reviews");
};

// ── Admin ─────────────────────────────────────────────────────────────────────

export const getAllReviews = (params) => {
  return api.get("/admin/reviews", { params });
};

export const updateReviewStatus = (id, status) => {
  return api.patch(`/admin/reviews/${id}/status`, { status });
};

export const deleteReview = (id) => {
  return api.delete(`/admin/reviews/${id}`);
};
