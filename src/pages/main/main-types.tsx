import menuImage from "@assets/main/menuImage.webp";
import NoImage from "@assets/main/NoImage.webp";

export interface MenuSet{
  items : string[];
}

//메뉴 데이터
export interface Store {
  id: number;
  restaurant: string; // 식당 이름
  date: string; // 날짜
  menuSets: MenuSet[];
  imageUrl : string; //사진
}

export const stores: Store[] = [
  {
      id: 1,
      restaurant: "학생 식당",
      date: "2024-10-29",
      menuSets: [
        { items: ["메뉴1", "미니해쉬브라운"] },
        { items: ["메뉴2", "비빔밥"] }
    ],
      imageUrl : menuImage
  },

  {
    id: 2,
    restaurant: "창업보육센터",
    date: "2024-10-29",
    menuSets: [
      { items: ["참치생야채비빔밥", "미니해쉬브라운"] },
      { items: ["전주식 콩나물 해장국", "비빔밥"] }
  ],
    imageUrl : menuImage
},
{
  id: 3,
  restaurant: "창의인재원 식당",
  date: "2024-10-29",
  menuSets: [
    { items: ["참치생야채비빔밥", "미니해쉬브라운"] },
    { items: ["전주식 콩나물 해장국", "비빔밥"] }
],
  imageUrl : NoImage
},
{
  id: 4,
  restaurant: "교직원 식당",
  date: "2024-10-29",
  menuSets: [
    { items: ["참치생야채비빔밥", "미니해쉬브라운"] },
    { items: ["전주식 콩나물 해장국", "비빔밥"] }
],
  imageUrl : menuImage
}
];