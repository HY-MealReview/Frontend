import menuImage from "@assets/main/menuImage.webp";
import NoImage from "@assets/main/NoImage.webp";

export interface Food {
  id: number;
  name: string;
  categoryId: number; // 카테고리 ID
  restaurantId: number; // 식당 ID
  ratings: Rating[]; // 평점 배열
}

export interface Rating {
  userId: number; // 사용자 ID
  score: number; // 평점
}

export interface Menu {
  id: number;
  restaurant: string; // 식당 이름
  date: string; // 날짜
  time: string; // 식사 시간
  foods: Food[]; // 음식 목록
  imageUrl: string; // 사진
  recommendations: Recommendation[]; // 추천 정보
}

export interface Recommendation {
  userId: number; // 사용자 ID
  isRecommended: boolean; // 추천 여부
}

export const menus: Menu[] = [
  {
    id: 5,
    restaurant: "학생 식당",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 1, name: "메뉴1", categoryId: 1, restaurantId: 1, ratings: [] },
      { id: 2, name: "미니해쉬브라운", categoryId: 1, restaurantId: 1, ratings: [] }
    ],
    imageUrl: menuImage,
    recommendations: []
  },
  {
    id: 6,
    restaurant: "학생 식당",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 3, name: "갈낙탕당면사리", categoryId: 1, restaurantId: 1, ratings: [] }
    ],
    imageUrl: menuImage,
    recommendations: []
  },
  {
    id: 7,
    restaurant: "창의인재원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 4, name: "참치생야채비빔밥", categoryId: 1, restaurantId: 2, ratings: [] },
      { id: 5, name: "미니해쉬브라운", categoryId: 1, restaurantId: 2, ratings: [] }
    ],
    imageUrl: menuImage,
    recommendations: []
  },
  {
    id: 8,
    restaurant: "창의인재원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 6, name: "김치볶음밥", categoryId: 1, restaurantId: 2, ratings: [] },
      { id: 7, name: "빌소시지", categoryId: 1, restaurantId: 2, ratings: [] }
    ],
    imageUrl: menuImage,
    recommendations: []
  },
  {
    id: 9,
    restaurant: "창업보육센터",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 8, name: "참치생야채비빔밥", categoryId: 1, restaurantId: 3, ratings: [] },
      { id: 9, name: "미니해쉬브라운", categoryId: 1, restaurantId: 3, ratings: [] }
    ],
    imageUrl: NoImage,
    recommendations: []
  },
  {
    id: 10,
    restaurant: "창업보육센터",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 10, name: "눈꽃치즈불닭", categoryId: 1, restaurantId: 3, ratings: [] },
      { id: 11, name: "해물짬뽕볶음우동", categoryId: 1, restaurantId: 3, ratings: [] }
    ],
    imageUrl: menuImage,
    recommendations: []
  },
  {
    id: 11,
    restaurant: "교직원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 12, name: "간장돈육볶음", categoryId: 1, restaurantId: 4, ratings: [] },
      { id: 13, name: "야채비빔국수", categoryId: 1, restaurantId: 4, ratings: [] }
    ],
    imageUrl: menuImage,
    recommendations: []
  },
  {
    id: 12,
    restaurant: "교직원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: [
      { id: 14, name: "함박스테이크", categoryId: 1, restaurantId: 4, ratings: [] },
      { id: 15, name: "날치알김치볶음밥", categoryId: 1, restaurantId: 4, ratings: [] },
      { id: 16, name: "모양떡볶이", categoryId: 1, restaurantId: 4, ratings: [] }
    ],
    imageUrl: NoImage,
    recommendations: []
  }
];
