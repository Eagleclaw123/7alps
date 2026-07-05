import api from "./api";

export const getCustomerStatus = () => {
  return api.get("/customer/status");
};

export const logoutCustomer = () => {
  return api.post("/customer/logout");
};

export const updateCustomerAddresses = (addresses) => {
  return api.patch("/customer/addresses", { addresses });
};
