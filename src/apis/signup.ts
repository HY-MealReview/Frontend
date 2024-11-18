import { axiosInstance } from "./axiosInstance";

export const checkIdRedundancy = async (student_id: string) => {
  try {
    const response = await axiosInstance.post("users/check/studentid/", {
      student_id: student_id,
    });
    return response;
  } catch (error) {
    console.error("학번 중복 인증 오류", error);
    return;
  }
};
