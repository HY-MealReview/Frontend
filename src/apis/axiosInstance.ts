import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});
