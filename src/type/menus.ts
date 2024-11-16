// 음식 타입 (foods 배열의 요소)
export interface Food {
    id: number;
    name: string; // 음식 이름 (추가 데이터가 있을 경우 포함)
  }
  
  // 메뉴 타입
  export interface Menu {
    id: number;
    date: string; // YYYY-MM-DD 형식
    restaurant: number; // 식당 ID
    foods: number[]; // 음식 ID 배열
  }
  