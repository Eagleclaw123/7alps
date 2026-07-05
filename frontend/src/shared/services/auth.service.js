import api from "./api";

export const adminLogin = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const b2bLogin = (credentials) => {
  return api.post("/b2b/login", credentials);
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};

export const sendCustomerOTP = (data) => {
  return api.post("/customer/send-otp", data);
};

export const verifyCustomerOTP = (data) => {
  return api.post("/customer/verify-otp", data);
};
