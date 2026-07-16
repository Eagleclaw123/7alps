import api from "./api";

// ── Auth ──────────────────────────────────────────────────────────────────────

export const b2bLoginRequest = (credentials) => {
  return api.post("/b2b/login", credentials);
};

export const b2bLogout = () => {
  return api.post("/b2b/logout");
};

export const getB2BStatus = () => {
  return api.get("/b2b/status");
};

// ── Dashboard ─────────────────────────────────────────────────────────────────

export const getB2BDashboardStats = () => {
  return api.get("/b2b/dashboard/stats");
};

// ── Quotes ────────────────────────────────────────────────────────────────────

export const createQuote = (payload) => {
  return api.post("/b2b/quotes", payload);
};

export const getMyQuotes = () => {
  return api.get("/b2b/quotes");
};

export const getMyQuote = (id) => {
  return api.get(`/b2b/quotes/${id}`);
};

// ── Orders ────────────────────────────────────────────────────────────────────

export const getMyB2BOrders = () => {
  return api.get("/b2b/orders");
};

export const getMyB2BOrder = (id) => {
  return api.get(`/b2b/orders/${id}`);
};
