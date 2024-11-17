export interface Menu {
  id: number; // 메뉴 ID
  restaurant: string; // 식당 이름
  date: string; // 메뉴 날짜
  foods: string[]; // 음식 이름 배열
}