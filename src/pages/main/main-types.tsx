import menuImage from "@assets/main/menuImage.webp";
import NoImage from "@assets/main/NoImage.webp";

export interface Menu {
  id: number;
  restaurant: string; // 식당 이름
  date: string; // 날짜
  time: string; // 식사 시간
  foods: string[]; // 음식 목록
  imageUrl : string; //사진
}

export const menus: Menu[] = [
  {
    id: 5,
    restaurant: "학생 식당",
    date: "2024-10-29",
    time: "중식",
    foods: ["메뉴1", "미니해쉬브라운"],
    imageUrl : menuImage
  },
  {
    id: 6,
    restaurant: "학생 식당",
    date: "2024-10-29",
    time: "중식",
    foods: ["갈낙탕당면사리"],
    imageUrl : menuImage
  },
  {
    id: 7,
    restaurant: "창의인재원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: ["참치생야채비빔밥", "미니해쉬브라운"],
    imageUrl : menuImage
  },
  {
    id: 8,
    restaurant: "창의인재원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: ["김치볶음밥", "빌소시지"],
    imageUrl : menuImage
  },
  {
    id: 9,
    restaurant: "창업보육센터",
    date: "2024-10-29",
    time: "중식",
    foods: ["참치생야채비빔밥", "미니해쉬브라운"],
    imageUrl : NoImage
  },
  {
    id: 10,
    restaurant: "창업보육센터",
    date: "2024-10-29",
    time: "중식",
    foods: ["눈꽃치즈불닭", "해물짬뽕볶음우동"],
    imageUrl : menuImage
  },
  {
    id: 11,
    restaurant: "교직원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: ["간장돈육볶음", "야채비빔국수"],
    imageUrl : menuImage
  },
  {
    id: 12,
    restaurant: "교직원 식당",
    date: "2024-10-29",
    time: "중식",
    foods: ["함박스테이크", "날치알김치볶음밥", "모양떡볶이"],
    imageUrl : NoImage
  }
];
