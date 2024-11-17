interface Food {
  id: number; // 음식 ID
  name: string; // 음식 이름
  average_rating?: number; // 평균 평점 (optional)
}

interface Menu {
  id: number; // 메뉴 ID
  restaurant_name: string; // 식당 이름
  date: string; // 메뉴 날짜
  foods: Food[]; // 음식 배열
}
