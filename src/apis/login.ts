import { axiosInstance } from "./axiosInstance";

export const requestLogin = async (inputValue: {
  student_id: string;
  password: string;
}) => {
  try {
    const tokens = await axiosInstance.post(`users/token/`, inputValue);

    return tokens;
  } catch (error) {
    console.error("Login error: ", error);
  }
};
