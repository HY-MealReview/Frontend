import { axiosInstance } from "./axiosInstance";

export const requestLogin = async (inputValue: {
  student_id: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(`users/token/`, inputValue);

    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      return response;
    }
  } catch (error) {
    console.error("Login Error: ", error);
  }
};

export const refreshAccessToken = async (refresh: string) => {
  try {
    const response = await axiosInstance.post(`users/token/refresh/`, {
      refresh,
    });
    return response;
  } catch (error) {
    console.error("Failed Refresh Token: ", error);
  }
};
