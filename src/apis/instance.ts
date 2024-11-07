import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxMDMyMjc0LCJpYXQiOjE3MzA3ODI1NzQsImp0aSI6ImVjZjMxYjE0Zjg3YjQyNmRiMjUzOTgwYjUzNTBlMDY1IiwidXNlcl9pZCI6MTF9.0CsYS8q5d2lF7gRQWrMb7vYRA0Z0MdZSc7-haoTJf0I"}`,
  },
});
