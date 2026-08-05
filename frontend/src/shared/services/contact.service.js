import api from "./api";

// ── Public ────────────────────────────────────────────────────────────────────

export const submitContactForm = (payload) => {
  return api.post("/contact", payload);
};

// ── Admin ─────────────────────────────────────────────────────────────────────

export const getAllContacts = () => {
  return api.get("/admin/contacts");
};

export const updateContactStatus = (id, status) => {
  return api.patch(`/admin/contacts/${id}/status`, { status });
};

export const deleteContact = (id) => {
  return api.delete(`/admin/contacts/${id}`);
};
