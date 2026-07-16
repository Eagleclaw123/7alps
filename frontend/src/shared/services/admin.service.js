import api from "./api";

// ── B2B members ───────────────────────────────────────────────────────────────

export const getB2BMembers = () => {
  return api.get("/admin/b2b");
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

export const getAllOrders = () => {
  return api.get("/admin/orders");
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
