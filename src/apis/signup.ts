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

export const checkNicknameRedundancy = async (nickname: string) => {
  try {
    const response = await axiosInstance.post("users/check/nickname/", {
      nickname: nickname,
    });
    return response;
  } catch (error) {
    console.error("닉네임 중복 인증 오류", error);
    return;
  }
};

export const requestSignup = async (formData: {
  student_id: string;
  nickname: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("users/", formData);
    return response;
  } catch (error) {
    console.error("회원가입 오류", error);
    return;
  }
};
