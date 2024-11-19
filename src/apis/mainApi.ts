import { axiosInstance } from "@apis/axiosInstance";
import { Menu } from "@type/menus";
import axios from "axios";


// 특정 식당의 메뉴와 평점을 가져오는 함수
export const getMenusWithRatings = async (restaurant: string, date: string) => {
  try {
    const menuResponse = await axiosInstance.get<Menu[]>(
      `menu/detail/namedate/?restaurant=${restaurant}&date=${date}`,
      {}
    );

    // ----평점 가져오기----
    const ratingsResponse = await axiosInstance.get(
      `restaurants/${restaurant}/${date}/ratings/`
    );

    // 로그를 추가하여 데이터 확인
    console.log(ratingsResponse.data);

    // 메뉴와 평점 결합
    const menusWithRatings = menuResponse.data.map((menu) => {
      const foodsWithRatings = menu.foods.map((foodName) => {
        // ratingsResponse.data가 배열인지 확인 후 평점 찾기
        const foodRating = Array.isArray(ratingsResponse.data)
          ? ratingsResponse.data.find((rating) => rating.name === foodName)
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
    if (error instanceof Error) {
      console.error("Failed to fetch restaurants:", error.message);
    } else {
      console.error("Failed to fetch restaurants:", String(error));
    }
    throw error;
  }
};

//----특정 음식의 카테고리를 가져오는 함수-------
// 특정 음식의 카테고리를 가져오는 함수
export const getFoodCategory = async (foodName: string, restaurant: string) => {
  try {
    // 음식에 해당하는 카테고리 id를 가져오기 위한 food API 요청
    const foodResponse = await axiosInstance.get(`/food/search/bynamerest`, {
      params: {
        food_name: foodName,
        restaurant_name: restaurant,
      },
    });
    
    // foodResponse에서 카테고리 id 추출
    const categoryId = foodResponse.data?.[0]?.category;
    if (!categoryId) return null;

    // 카테고리 id로 카테고리 name을 가져오는 API 요청
    const categoryResponse = await axiosInstance.get(`/category/all/`);
    const category = categoryResponse.data.find((category: { id: number; name: string }) => category.id === categoryId);

    return category ? category.name : null;
  } catch (error) {
    console.error("Error fetching food category:", error);
    return null;
  }
};

// 특정 카테고리의 음식들에 대한 평균 평점 계산 함수
export const getCategoryAverageRating = async (category: string) => {
  try {
    // 1. 카테고리 이름으로 해당 카테고리의 모든 음식들 가져오기
    const foodsResponse = await axiosInstance.get(`/food/search/bycategory/?name=${category}/`);

    if (foodsResponse.data.length === 0) {
      return { averageRating: null }; // 음식이 없으면 평균 평점 없음
    }

    // 2. 각 음식의 평점 정보 가져오기
    const ratingsPromises = foodsResponse.data.map((food: { id: number }) =>
      axiosInstance.get(`/rating/food/${food.id}/average/`)
    );

    // 평점 정보를 모두 가져옴
    const ratingsResponse = await Promise.all(ratingsPromises);

    // 3. 모든 음식들의 평점 합산 및 평균 계산
    const totalRating = ratingsResponse.reduce(
      (acc: number, response: any) => acc + response.data.average_rating,
      0
    );

    const averageRating = totalRating / ratingsResponse.length; // 평균 평점 계산

    // 4. 결과 반환
    return {
      averageRating: parseFloat(averageRating.toFixed(1)), // 소수점 첫째 자리까지
    };
  } catch (error) {
    console.error("카테고리 평균 평점 계산 중 오류 발생:", error);
    return { averageRating: null }; // 오류 시 평균값 없음 반환
  }
};



export const getMenusWithCategories = async (restaurant: string, date: string) => {
  try {
    const menusResponse = await axiosInstance.get(
      `menu/detail/namedate/?restaurant=${restaurant}&date=${date}`,
      {}
    );

    const menusWithCategories = await Promise.all(
      menusResponse.data.map(async (menu) => {
        const firstFood = menu.foods[0]; // foods[0]는 객체임
        let firstFoodCategory = null;

        if (firstFood) {
          firstFoodCategory = await getFoodCategory(firstFood.name, menu.restaurant_name);
        }
        return {
          ...menu,
          firstFoodCategory,
        };
      })
    );


    return menusWithCategories;
  } catch (error) {
    console.error("Error fetching menus with categories:", error);
    throw error;
  }
};


//------mainModal의 평점 매기기를 백으로 전달하는 api------------
export const submitReviewAPI = async (foodId: number, rating: number) => {
  if (!foodId || !rating) {
      console.error("Missing foodId or rating:", { foodId, rating });
      return; // `foodId`나 `rating`이 없으면 리뷰를 제출하지 않음
  }

  try {
      const response = await axiosInstance.post(`/rating/`, { food: foodId, rating });
      return response?.data || {}; // 응답이 없으면 빈 객체 반환
  } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
  }
};









export const getMenu = async (restaurant: string, date: string) => {
  try {
    const response = await axiosInstance.get(
      `/restaurants/${restaurant}/${date}/ratings/`
    );
    console.log(response.data); // 응답 데이터 확인
    return response.data; // 평점 데이터 반환
  } catch (error) {
    console.error("메뉴 데이터를 가져오는데 실패했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

//-----------추천 api------------
export const getRecommendCount = async (menu_id: number) => {
  try {
    const response = await axiosInstance.get(
      `recommend/menu/${menu_id}/count/`
    );
    return response.data; // 평점 데이터 반환
  } catch (error) {
    console.error("메뉴 데이터를 가져오는데 실패했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const createRecommend = async (
  menuId: number,
  recommendation: boolean
) => {
  try {
    const response = await axiosInstance.post(`recommend/`, {
      menu: String(menuId),
      recommendation: String(recommendation),
    });
    return response;
  } catch (error) {
    console.error("추천 오류", error);
  }
};

//추천하기 버튼 눌렀을때 반영
export const recommendMenu = async (menuId: string, recommendation: string) => {
  try {
    const response = await axiosInstance.put(
      `/recommend/menu/${menuId}/update/`,
      {
        menu: menuId,
        recommendation: recommendation,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating recommendation:", error);
    throw error;
  }
};

//추천하기 버튼 취소했을때 반영
export const recommendCancelMenu = async (
  menuId: number,
  recommendation: boolean
) => {
  try {
    const response = await axiosInstance.put(`/recommend/${menuId}/delete/`, {
      menu: menuId,
      recommendation: recommendation,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recommendation:", error);
    throw error;
  }
};
