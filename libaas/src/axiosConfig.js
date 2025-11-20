import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, 
});

// Send token with every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token; // ⭐ Token always attached
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
