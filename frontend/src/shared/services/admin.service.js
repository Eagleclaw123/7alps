import api from "./api";

// ── Public ────────────────────────────────────────────────────────────────────

export const getPublicDeliverySettings = () => {
  return api.get("/settings/public");
};

// ── B2B members ───────────────────────────────────────────────────────────────

export const getB2BMembers = (params) => {
  return api.get("/admin/b2b", { params });
};

export const createB2BMember = (payload) => {
  return api.post("/admin/b2b", payload);
};

export const updateB2BMember = (id, payload) => {
  return api.patch(`/admin/b2b/${id}`, payload);
};

export const deleteB2BMember = (id) => {
  return api.delete(`/admin/b2b/${id}`);
};

// ── B2B quotes ────────────────────────────────────────────────────────────────

export const getAllQuotes = (params) => {
  return api.get("/admin/quotes", { params });
};

export const getQuote = (id) => {
  return api.get(`/admin/quotes/${id}`);
};

export const approveQuote = (id, payload) => {
  return api.patch(`/admin/quotes/${id}/approve`, payload);
};

export const rejectQuote = (id, reason) => {
  return api.patch(`/admin/quotes/${id}/reject`, { reason });
};

// ── Dashboard ─────────────────────────────────────────────────────────────────

export const getDashboardStats = () => {
  return api.get("/admin/dashboard/stats");
};

// ── Orders ────────────────────────────────────────────────────────────────────

export const getAllOrders = (params) => {
  return api.get("/admin/orders", { params });
};

export const getOrder = (id) => {
  return api.get(`/admin/orders/${id}`);
};

export const updateOrderStatus = (id, status) => {
  return api.patch(`/admin/orders/${id}/status`, { status });
};

// ── Customers ─────────────────────────────────────────────────────────────────

export const getCustomers = () => {
  return api.get("/admin/customers");
};

// ── Settings ──────────────────────────────────────────────────────────────────

export const getSettings = () => {
  return api.get("/admin/settings");
};

export const updateSettings = (payload) => {
  return api.patch("/admin/settings", payload);
};

export const adminForgotPassword = (email) => {
  return api.post("/auth/forgotPassword", { email });
};

export const adminVerifyOTP = (email, otp) => {
  return api.post("/auth/verifyOTP", { email, otp });
};

export const adminResetPasswordAfterOTP = (
  email,
  otp,
  password,
  passwordConfirm,
) => {
  return api.post("/auth/resetPasswordAfterOTP", {
    email,
    otp,
    password,
    passwordConfirm,
  });
};
