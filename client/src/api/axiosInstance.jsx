import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/user";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
