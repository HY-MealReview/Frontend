import { axiosInstance } from "./axiosInstance";

export const requestLogin = async () => {
  try {
    const tokens = await axiosInstance.get(`users/detail/`);

    return tokens;
  } catch (error) {
    console.error("Login error: ", error);
  }
};
