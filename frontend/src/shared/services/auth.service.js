import api from "./api";

export const adminLogin = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const getCurrentAdminStatus = () => {
  return api.get("/auth/status");
};

export const sendCustomerOTP = (data) => {
  return api.post("/customer/send-otp", data);
};

export const verifyCustomerOTP = (data) => {
  return api.post("/customer/verify-otp", data);
};

export const completeCustomerMobile = (pendingToken, mobile) => {
  return api.post(
    "/customer/complete-mobile",
    { mobile },
    { headers: { Authorization: `Bearer ${pendingToken}` } },
  );
};
