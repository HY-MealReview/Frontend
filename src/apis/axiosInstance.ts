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

// 오류로 인한 재시도 횟수 제한
let retryCount = 0;
const MAX_RETRY = 2;

axiosInstance.interceptors.response.use(
  (response) => {
    retryCount = 0;
    return response;
  },
  async (error) => {
    // 실패한 요청의 모든 정보 설정
    const originalRequest = error.config;

    // 서버에서 응답을 받은 경우 (CORS 오류가 아님)
    if (error.response) {
      console.log("Server responded with error:", error.response.status);
      return Promise.reject(error);
    }

    // 요청은 보냈지만 응답을 받지 못한 경우 (CORS 오류 포함)
    // 로그인은 됐지만 토큰값 만료된 경우
    else if (error.request) {
      console.log("No response received:", error.request);

      // 재시도 횟수가 최대치를 넘으면 에러를 반환
      if (retryCount >= MAX_RETRY) {
        console.log("Max retry count reached");
        retryCount = 0;
        return Promise.reject(new Error("Maximum retry attempts reached"));
      }

      try {
        // refresh token으로 새로운 access token 발급 시도
        const refresh = localStorage.getItem("refreshToken") as string;
        if (!refresh) {
          throw new Error("No refresh token available");
        }

        // 토큰 갱신
        const response = await refreshAccessToken(refresh);

        if (response?.data.access) {
          localStorage.setItem("accessToken", response.data.access);

          retryCount++;

          // 토큰 갱신 후 요청 정보 업데이트
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          }

          // 동일한 요청을 새로운 토큰으로 재시도
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    // 그 외의 에러
    return Promise.reject(error);
  }
);
