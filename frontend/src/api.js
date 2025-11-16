import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Your backend URL
});

// Optional: Add a request interceptor to include auth token if you have one
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
