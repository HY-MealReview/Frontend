import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNDE1MDI2LCJpYXQiOjE3MzE4MTAyMjYsImp0aSI6ImMyZDU2ZmM1NzliYTRkYTQ4NjE0ZDE4N2ZiY2NjZDVkIiwidXNlcl9pZCI6NX0.7hSppLIyCablW6yQbdqsEe0BjXkk6VijQT8sc16piko"}`,
  },
});
