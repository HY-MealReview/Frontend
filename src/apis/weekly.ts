import { axiosInstance } from "./axiosInstance"

// 전체 메뉴 출력
export const getAllMenus = async () => {
    const response = await axiosInstance.get("/menu/all/");
    return response.data;
  };
  
  // 특정 식당과 날짜에 해당하는 메뉴 출력
  export const getMenuByRestaurantAndDate = async (restaurant: string, date: string) => {
    const result = [];
    const response1 = await axiosInstance.get(`/menu/detail/namedate/`, {
      params: { restaurant, date, time:"조식" },
    });
    const response2 = await axiosInstance.get(`/menu/detail/namedate/`, {
      params: { restaurant, date, time:"중식" },
    });
    const response3 = await axiosInstance.get(`/menu/detail/namedate/`, {
      params: { restaurant, date, time:"석식" },
    });
    result.push(...response1.data);
    result.push(...response2.data);
    result.push(...response3.data);
    return result;
  };
  
  // 날짜와 메뉴 타입에 따라 메뉴 출력
  export const getMenuByDateAndTime = async (date: string, time: string) => {
    const response = await axiosInstance.get(`/menu/detail/datetime/`, {
      params: { date, time },
    });
    return response.data;
  };

  export const getMenu = async (restaurant: string, date: string) => {
    try{
      const response = await axiosInstance.get(
        `/restaurants/${restaurant}/${date}/ratings/`
      );
      console.log(response)
      return response.data;
    } catch (error){ 
      console.error("메뉴 데이터를 가져오는데 실패했습니다.", error);
    }
  };