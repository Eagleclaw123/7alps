import { api } from "./api";

export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  logout: () => api.post("/auth/logout"),
  getStatus: () => api.get("/auth/status"),
};
