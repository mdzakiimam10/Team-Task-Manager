import axios from "axios";

// 🔥 BASE URL (ENV SUPPORT)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
});

// 🔥 REQUEST INTERCEPTOR (TOKEN ATTACH)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔥 RESPONSE INTERCEPTOR (AUTO LOGOUT)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default API;