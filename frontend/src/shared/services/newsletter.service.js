import api from "./api";

export const subscribeToNewsletter = (email) => {
  return api.post("/newsletter/subscribe", { email });
};
