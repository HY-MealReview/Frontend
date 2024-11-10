import { axiosInstance } from "./axiosInstance";

export const getMyInfo = async () => {
  const [nicknameResponse, myReviewResponse] = await Promise.all([
    axiosInstance.get("users/detail/"),
    axiosInstance.get("rating/user/all/"),
  ]);

  const nickname = nicknameResponse.data.nickname;
  const review = myReviewResponse.data;

  return { nickname, review };
};

export const changeNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.post("users/change/nickname/", {
      nickname,
    });
    return response;
  } catch (error) {
    return;
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
    return;
  }
};
