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
    throw error; // 에러를 호출하는 쪽에서 처리하도록 던짐
  }
};


//식당 id랑 이름
export const getAllRestaurants = async () => {
  try {
    const response = await axiosInstance.get('/restaurant/all/');
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch restaurants:", error.response || error.message);
    throw error;
  }
};

// 특정 식당의 메뉴 세트를 가져오는 함수
export const getMenusByRestaurantAndDate = async (restaurant: string, date: string): Promise<Menu[]> => {
  try {
    const tokens = await adminLogin();
    console.log("발급된 토큰:", tokens);

    // 메뉴 데이터를 가져옵니다.
    const response = await axiosInstance.get<Menu[]>(`menu/detail/namedate/?restaurant=${restaurant}&date=${date}`, {
      headers: {
        Authorization: `Bearer ${tokens.access}`, // 발급된 토큰을 헤더에 추가
      },
    });

    console.log("Menu Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch menus:", error.response || error.message);
    throw error;
  }
};

// 특정 식당의 메뉴에 속한 음식들에 대한 평점 출력 -> 한 식당의 메뉴마다의 평점

export const getRatingsByRestaurantAndDate = async (restaurant: string, date: string) => {
  try {
    const response = await axios.get(`restaurants/${restaurant}/${date}/ratings/`);
    return response.data; // 평점 데이터 반환
  } catch (error) {
    console.error("Failed to fetch ratings:", error);
    throw error;
  }
};


// 특정 메뉴의 모든 추천/비추천 출력
export const getRecommendationCount = async (menuId: number): Promise<{ true_count: number; false_count: number; recommendation: boolean }> => {
  try {
    const response = await axiosInstance.get(`/recommend/menu/${menuId}/count/`);
    return {
      true_count: response.data.true_count,
      false_count: response.data.false_count,
      recommendation: response.data.recommendation || false, // 추천 상태 추가
    };
  } catch (error) {
    console.error("Failed to fetch recommendation count:", error);
    throw error;
  }
};


// 특정 메뉴의 추천 여부를 설정하는 함수
export const setRecommendation = async (menuId: number, status: boolean): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/recommend/${menuId}/`, {
      date: "2024-10-29",
      restaurant: 2, 
      recommendation: status,
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to set recommendation:", error.response || error.message);
    throw error;
  }
};

//별점 가져오기 
export const fetchAverageRating = async (menuId: number) => {
  try {
    const response = await fetch(`/rating/food/${menuId}/average/`);
    console.log("Response:", await response.text()); // 응답을 텍스트로 출력
    if (!response.ok) {
      throw new Error('별점을 가져오는 데 실패했습니다.');
    }
    const data = await response.json();
    return data.average_rating; // 평균 별점 반환
  } catch (error) {
    console.error("Error fetching average rating:", error);
    return null; // 오류 발생 시 null 반환
  }
};
