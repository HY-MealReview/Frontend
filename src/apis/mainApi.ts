import { axiosInstance } from '@apis/axiosInstance';
import { Menu } from '@type/menus';
import axios from 'axios';

// 관리자 로그인 요청 함수
export const adminLogin = async () => {
  const studentId = "0000000000"; // 관리자 ID 또는 student_id
  const password = "admin0000"; // 관리자 비밀번호
  try {
    const response = await axiosInstance.post('users/token/', {
      student_id: studentId, // 필수 항목으로 student_id 추가
      password,
    });
    return response.data; // 반환되는 데이터에서 토큰 추출
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch restaurants:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
};

// 모든 식당 가져오기
export const getAllRestaurants = async () => {
  try {
    const response = await axiosInstance.get('/restaurant/all/');
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch restaurants:", error.response || error.message);
    throw error;
  }
};

// 특정 식당의 메뉴와 평점을 가져오는 함수
export const getMenusWithRatings = async (restaurant: string, date: string) => {
  try {
    const tokens = await adminLogin();
    const menuResponse = await axiosInstance.get<Menu[]>(`menu/detail/namedate/?restaurant=${restaurant}&date=${date}`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`, // 발급된 토큰을 헤더에 추가
      },
    });

    const ratingsResponse = await axios.get(`restaurants/${restaurant}/${date}/ratings/`);

    // 메뉴와 평점 결합
    const menusWithRatings = menuResponse.data.map(menu => {
      const foodsWithRatings = menu.foods.map((food: Food) => {
        if (typeof food === 'object' && food !== null) {
          return {
            ...food,
            average_rating: ratingsResponse.data[food.name]?.average_rating || 0, // 평점이 없으면 0으로 설정
          };
        }
        return food; // food가 객체가 아닌 경우 원래 food를 반환 (이 부분은 잘못된 데이터에 대한 안전망)
      });
      return {
        ...menu,
        foods: foodsWithRatings,
      };
    });

    return menusWithRatings;
  } catch (error) {
    console.error("Failed to fetch menus with ratings:", error.response || error.message);
    throw error;
  }
};
