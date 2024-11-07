import axios from "axios";
import { axiosInstance } from "./instance";

export const requestLogin = async () => {
  try {
    const tokens = await axiosInstance.get(`users/detail/`);

    return tokens;
  } catch (error) {
    console.error("Login error: ", error);
  }
};
