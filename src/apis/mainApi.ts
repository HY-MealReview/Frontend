import { axiosInstance } from '@apis/axiosInstance';
import {Menu} from '@type/menus';

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
        Authorization: `Bearer ${tokens.access}`,
      },
    });

   // 평점 가져오기
   const ratingsResponse = await axios.get(`restaurants/${restaurant}/${date}/ratings/`);
    
   // 로그를 추가하여 데이터 확인
   console.log(ratingsResponse.data);

   // 메뉴와 평점 결합
   const menusWithRatings = menuResponse.data.map(menu => {
     const foodsWithRatings = menu.foods.map(foodName => {
       // ratingsResponse.data가 배열인지 확인 후 평점 찾기
       const foodRating = Array.isArray(ratingsResponse.data) 
         ? ratingsResponse.data.find((rating: any) => rating.name === foodName) 
         : null; // 배열이 아닐 경우 null로 설정

       return {
         name: foodName,
         average_rating: foodRating ? foodRating.average_rating : 0, // 평점이 없으면 0으로 설정
       };
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

export const getMenu = async (restaurant: string, date: string) => {
  try {
    
    const response = await axiosInstance.get(`/restaurants/${restaurant}/${date}/ratings/`);
    console.log(response.data); // 응답 데이터 확인
    return response.data; // 평점 데이터 반환
  } catch (error) {
    console.error("메뉴 데이터를 가져오는데 실패했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const recommendMenu = async (menuId: number, recommendation: boolean) => {
  try {
    const tokens = await adminLogin();
    const response = await axiosInstance.put(`/recommend/${menuId}/update/`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
      menu: menuId,
      recommendation: recommendation,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recommendation:", error);
    throw error;
  }
};

