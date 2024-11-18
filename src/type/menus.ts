
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