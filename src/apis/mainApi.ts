import { axiosInstance } from "@apis/axiosInstance";
import { Menu } from "@type/menus";
import axios from "axios";


// 특정 식당의 메뉴와 평점을 가져오는 함수
export const getMenusWithRatings = async (restaurant: string, date: string) => {
  try {
    // 메뉴 데이터 가져오기
    const menuResponse = await axiosInstance.get<Menu[]>(
      `menu/detail/namedate/?restaurant=${restaurant}&date=${date}`,
      {}
    );
    // 평점 데이터 가져오기
    const ratingsResponse = await axiosInstance.get(
      `restaurants/${restaurant}/${date}/ratings/`
    );
    const menusWithRatings = menuResponse.data.map((menu) => {    // 메뉴와 평점 결합
      const foodsWithRatings = menu.foods.map((foodName) => {
        // 평점 데이터에서 음식별 평점을 찾아오는 코드
        const foodRating = Array.isArray(ratingsResponse.data)
          ? ratingsResponse.data.find((rating) => rating.name === foodName)
          : null;

        // foodId를 추가할 수 있는 방법 (id가 별도로 제공되지 않는 경우 foodName 기반으로 ID 생성 등)
        const foodId = foodName; // 예시로 foodName을 foodId로 사용할 수 있음. 실제 API에서 foodId가 제공된다면 수정 필요.

        return {
          name: foodName,
          average_rating: foodRating ? foodRating.average_rating : 0, // 평점이 없으면 0으로 설정
          id: foodId, // 음식의 id를 추가
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
    console.log()
    
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


export const getMenusWithCategories = async (restaurant: string, date: string) => {
  try {
    const menusResponse = await axiosInstance.get<Menu[]>(
      `menu/detail/namedate/?restaurant=${restaurant}&date=${date}`,
      {}
    );

    const menusWithCategories = await Promise.all(
      menusResponse.data.map(async (menu:Menu) => {
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

// 리뷰 제출 API 호출
export const postRating = async (ratingData: { food: number; rating: number }) => {
  try {
    const response = await axiosInstance.post(`/rating/`, ratingData);
    console.log("Rating submitted:", response.data);
  } catch (error) {
    console.error("Error submitting rating:", error);
  }
};

export const getFoodIdByName = async (foodName: string) => {
  try {
    // 모든 음식 데이터를 가져옴
    const response = await axiosInstance.get(`/food/all/`);
    
    // 응답 전체 구조 출력
    console.log("API Response:", response);
    
    // 응답 객체의 구조를 명확하게 확인
    if (!response || !response.data) {
      return null; // 응답이 없거나 구조가 잘못되었으면 null 반환
    }
    
    // foodName을 소문자와 공백을 제거하여 비교
    const formattedFoodName = foodName.toLowerCase().trim();

    // 음식 이름과 비교하여 id 찾기
    const food = response.data.find((item: { name: string }) => 
      item.name.toLowerCase().trim() === formattedFoodName
    );

    if (!food) {
      console.error(`Food with name ${foodName} not found`);
      return null; // 해당 음식이 없으면 null 반환
    }

    console.log("Found Food:", food);  // 찾은 음식 정보 출력

    return food.id; // 음식의 id 반환
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    return null; // 에러 발생 시 null 반환
  }
};




//-------------------추천 api-----------------------
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





// // 특정 카테고리의 음식들에 대한 평균 평점 계산 함수
// export const getCategoryAverageRating = async (category_name: string) => {
//   try {
//     // 1. 카테고리 이름으로 해당 카테고리의 모든 음식들 가져오기
//     const encodedCategoryName = encodeURIComponent(category_name); // URL 인코딩
//     const foodsAllResponse = await axiosInstance.get(`/food/search/bycategory/?name=${encodedCategoryName}`);
//     const foods: Food[] = foodsAllResponse.data;

//     if (!foods || foods.length === 0) {
//       return { averageRating: null }; // 음식이 없으면 평균 평점 없음
//     }

//     // 2. 각 음식의 평점 정보 가져오기
//     const ratingsPromises = foods.map((food) =>
//       axiosInstance.get<RatingResponse>(`/rating/food/${food.id}/average/`)
//     );

//     // 각 음식 id에 대한 평점 정보를 모두 가져옴
//     const ratingsResponse = await Promise.all(ratingsPromises);

//     // 3. 모든 음식들의 평점 합산 및 평균 계산
//     const totalRating = ratingsResponse.reduce(
//       (acc, response) => acc + (response.data.average_rating || 0),
//       0
//     );

//     const averageRating = totalRating / foods.length;

//     return { averageRating };
//   } catch (error) {
//     console.error("Error fetching category average rating:", error);
//     return { averageRating: null }; // 에러 발생 시 null 반환
//   }
// };
