
export interface Menu {
  id: number
  menu_date: string; // 메뉴 날짜
  restaurant_name: string; // 식당 이름
  time: string; // 식사 시간 (조식/중식/석식)
  foods: {
    id: number;
    name: string;
    average_rating: number;
  }[]; // 음식 정보 배열
}
export interface FoodRating {
  id: number;
  name: string;
  total_rating: number;
  average_rating: number;
  users_count: number;
  category_name: string;
  restaurant_name: string;
}

export interface Rating {
  menu_date: string;
  restaurant_name: string;
  time: string;
  foods: FoodRating[];
}
