import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
