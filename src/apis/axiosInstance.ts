import axios from "axios";
import { refreshAccessToken } from "./login";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 전달
  async (error) => {
    const originalRequest = error.config;

    // 서버에서 응답을 받은 경우
    if (error.response) {
      console.log("Server responded with error:", error.response.status);

      try {
        const refresh = localStorage.getItem("refreshToken") as string;
        // refresh 토큰 있는 경우만 고려
        // 즉, 이미 로그인 된 상태에서 토큰 값 만료 되었을 때에만 토큰값 재갱신
        if (refresh) {
          const response = await refreshAccessToken(refresh);
          if (response?.data.access) {
            localStorage.setItem("accessToken", response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return axiosInstance(originalRequest); // 재시도
          }
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // 요청은 보냈지만 응답을 받지 못한 경우 (CORS 오류 포함)
    // 로그인은 됐지만 토큰값 만료된 경우
    else if (error.request) {
      console.log("No response received:", error.request);
      return;
    }
  }
);
