import { axiosInstance } from "./axiosInstance";

export const getUserReviews = async () => {
  try {
    const response = await axiosInstance.get("rating/user/all/");
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
