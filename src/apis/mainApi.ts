import { axiosInstance } from '@apis/axiosInstance';
import { Menu } from '@type/menus';

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

export const getAllRestaurants = async () => {
  try {
    const response = await axiosInstance.get('/restaurant/all/');
    return response.data; // 이 데이터가 배열인지 확인하세요.
  } catch (error) {
    console.error("Failed to fetch restaurants:", error.response || error.message);
    throw error;
  }
};

// 특정 식당의 메뉴 세트를 가져오는 함수
export const getMenusByRestaurantAndDate = async (restaurant: string, date: string): Promise<Menu[]> => {
  try {
    // 관리자 로그인하여 토큰을 가져옵니다.
    const tokens = await adminLogin();
    console.log("발급된 토큰:", tokens); // 발급된 토큰 확인

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

// 특정 메뉴의 모든 추천/비추천 출력
export const getRecommendationCount = async (menuId: number): Promise<{ true_count: number; false_count: number; date: string }> => {
  try {
    const response = await axiosInstance.get(`/recommend/menu/${menuId}/count/`);
    return response.data; // true_count와 false_count 포함
  } catch (error) {
    console.error("Failed to fetch recommendation count:", error.response || error.message);
    throw error;
  }
};

// 특정 메뉴의 추천 여부를 설정하는 함수
export const setRecommendation = async (menuId: number, status: boolean): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/recommend/${menuId}/`, {
      date: "2024-10-29", // 필요한 경우 동적으로 날짜를 설정하세요
      restaurant: 2, // 필요한 경우 동적으로 식당 ID를 설정하세요
      recommendation: status,
    });
    return response.data; // 요청 결과 반환
  } catch (error) {
    console.error("Failed to set recommendation:", error.response || error.message);
    throw error;
  }
};
