import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const changeNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.post("users/change/nickname/", {
      nickname,
    });
    return response;
  } catch (error) {
    console.error("Nickname Change Error", error);
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 500) {
        console.log("서버 오류 발생");
      }
    }
  }
};

export const changePassword = async (data: {
  old_password: string;
  new_password: string;
}) => {
  try {
    const response = await axiosInstance.post("users/change/password/", data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        return error.response.data.error;
      }
    }
  }
};
