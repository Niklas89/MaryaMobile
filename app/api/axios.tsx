import axios from "axios";
const BASE_URL = "http://10.0.2.2:8080/api"; // base URL for the backend server

export default axios.create({
  baseURL: BASE_URL,
});

// attach interceptors to this axios private that will refresh the tokens
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
