const BASE = "/api/v1";

const getToken = () => localStorage.getItem("admin_token");

const request = async (method, path, body = null, isFormData = false) => {
  const headers = {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const options = { method, headers };
  if (body) options.body = isFormData ? body : JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const api = {
  get: (path) => request("GET", path),
  post: (path, body, isFormData = false) => request("POST", path, body, isFormData),
  patch: (path, body, isFormData = false) => request("PATCH", path, body, isFormData),
  delete: (path) => request("DELETE", path),
};
