import { axiosInstance } from "./axiosInstance";

export const checkIdRedundancy = async (nickname: string) => {
  try {
    const response = await axiosInstance.post(
      "users/check/nickname/",
      nickname
    );
    return response;
  } catch (error) {
    console.error("학번 중복 인증 오류", error);
    return;
  }
};
