import axios from "axios";
import { refreshAccessToken } from "./login";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjk0MjM4LCJpYXQiOjE3MzE2ODk0MzgsImp0aSI6IjU1YjFjNWE1ZjA4NzRiMGE4YjY4ZTQwYzNiZDkzYThiIiwidXNlcl9pZCI6MTJ9.G2z2BGcPjtRX0JCzSVdjIIrqeq6ZsT0PUN39Sp2W_NI"}`,
  },
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     config.headers["Content-Type"] = "application/json";

//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     // 실패한 요청의 모든 정보 설정
//     const originalRequest = error.config;

//     // 서버에서 응답을 받은 경우 (CORS 오류가 아님)
//     if (error.response) {
//       console.log("Server responded with error:", error.response.status);
//     }

//     // 요청은 보냈지만 응답을 받지 못한 경우 (CORS 오류 포함)
//     // 로그인은 됐지만 토큰값 만료된 경우
//     else if (error.request) {
//       console.log("No response received:", error.request);

//       // 요청이 이미 재시도된 경우 중단
//       if (originalRequest._retry) {
//         return Promise.reject(error);
//       }

//       // 첫 번째 재시도
//       originalRequest._retry = true;
//       // refresh token으로 새로운 access token 발급
//       try {
//         const refresh = localStorage.getItem("refreshToken") as string;
//         if (!refresh) throw new Error("No refresh token available");

//         // 토큰 갱신 요청
//         const response = await refreshAccessToken(refresh);

//         if (response?.data.access) {
//           localStorage.setItem("accessToken", response.data.access);

//           // 토큰 요청 정보 업데이트
//           if (originalRequest.headers) {
//             originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
//           }

//           // 동일한 요청을 새로운 토큰으로 재시도
//           return axiosInstance(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         return Promise.reject(refreshError);
//       }
//     }

//     // 그 외의 에러
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response, // 성공적인 응답은 그대로 전달
//   async (error) => {
//     const originalRequest = error.config;

//     // 요청이 이미 재시도된 경우 중단
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     // 첫 번째 재시도
//     originalRequest._retry = true;

//     try {
//       const refresh = localStorage.getItem("refreshToken") as string;
//       const response = await refreshAccessToken(refresh);

//       if (response?.data.access) {
//         localStorage.setItem("accessToken", response.data.access);
//         originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
//         return axiosInstance(originalRequest); // 재시도
//       }
//     } catch (refreshError) {
//       return Promise.reject(refreshError);
//     }
//   }
// );
