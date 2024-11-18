import { axiosInstance } from '@apis/axiosInstance';
import {Menu} from '@type/menus';



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
     const menuResponse = await axiosInstance.get<Menu[]>(`menu/detail/namedate/?restaurant=${restaurant}&date=${date}`, {
     });
     console.log("메뉴 데이터 : "+ menuResponse.data[0])

     menuResponse.data.forEach(menu => {
      console.log("현재 메뉴:", menu);
      menu.foods.forEach(food => {
        console.log("현재 음식:", food);
      });
    });

    // 평점 가져오기
    //const ratingsResponse = await axiosInstance.get(`rating/food/${food.id}}/average/`);
    
    // 로그를 추가하여 데이터 확인
    //console.log("0000000000000000"+ratingsResponse.data);

     // 각 메뉴의 foods 배열을 순회하며 평점 데이터 가져오기
     const menusWithRatings = await Promise.all(
      menuResponse.data.map(async (menu) => {
        console.log("현재 메뉴:", menu);
        const foodsWithRatings = await Promise.all(
          menu.foods.map(async (foodName) => {
            console.log("현재 음식:", foodName);

            try {
              // 각 음식 ID로 평점 데이터 요청
              const ratingsResponse = await axiosInstance.get(
                `rating/food/name/?name=${encodeURIComponent(foodName.average_rating)}`
              );
              console.log(`음식 ID ${foodName.id}의 평점 데이터:`, ratingsResponse.data);

              return {
                ...foodName,
                average_rating: ratingsResponse.data.average_rating || 0, // 평점이 없으면 0으로 설정
              };
            } catch (error) {
              console.error(
                `음식 ID ${foodName.id}의 평점을 가져오는 중 오류 발생:`,
                error.response || error.message
              );
        return {
          ...foodName,
          average_rating: 0, // 오류 발생 시 기본값 설정
        };
      }
    })
  );

  return {
    ...menu,
    foods: foodsWithRatings,
  };
})
);
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

export const getRecommendCount = async (menu_id: number) => {
  try {
    
    const response = await axiosInstance.get(`recommend/menu/${menu_id}/count/`);
    return response.data; // 평점 데이터 반환
  } catch (error) {
    console.error("메뉴 데이터를 가져오는데 실패했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

//추천하기 버튼 눌렀을때 반영
export const recommendMenu = async (menuId: number, recommendation: boolean) => {
  try {
    const response = await axiosInstance.put(`/recommend/${menuId}/update/`, 
      {
        menu: menuId,
        recommendation: recommendation
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating recommendation:", error);
    throw error;
  }
};


