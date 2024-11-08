import React from 'react';
import image from "../../assets/weekly/menuImage.webp"

interface MenuItem {
  name: string;
  score: number;
}

interface StoreMenu {
  id: number; // 식당 ID
  restaurant: string; // 식당 이름
  imageUrl: string; // 이미지 경로
  rating: number; // 식당 전체 별점
  date: string; // 메뉴 날짜
  time: string;
  mainMenu: MenuItem[]; // 메뉴 리스트
}

export const menuData: StoreMenu[] = [
  {
    id: 1,
    restaurant: "학생식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-04",
    time: "중식",
    mainMenu: [
      { name: "육개장", score: 4 },
      { name: "생선까스", score: 4 },
      { name: "고구마돈까스", score: 4.5 },
    ],
  },
  {
    id: 2,
    restaurant: "창업보육센터",
    imageUrl: image,
    rating: 4.0,
    date: "2024-11-04",
    time: "중식",
    mainMenu: [
      { name: "양념치킨덮밥", score: 4 },
      { name: "비빔밥", score: 4.2 },
      { name: "된장찌개", score: 3.8 },
    ],
  },
  {
    id: 3,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.2,
    date: "2024-11-04",
    time: "조식",
    mainMenu: [
      { name: "떡볶이", score: 4.1 },
      { name: "순두부찌개", score: 4.3 },
      { name: "김치볶음밥", score: 4.4 },
    ],
  },
  {
    id: 4,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-04",
    time: "석식",
    mainMenu: [
      { name: "전주식 콩나물 해장국", score: 4.1 },
      { name: "고기표고버섯국밥", score: 3.9},
      { name: "고구마돈까스", score: 4.5 },
    ],
  },
  {
    id: 5,
    restaurant: "창업보육센터",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-04",
    time: "석식",
    mainMenu: [
      { name: "어묵우동", score: 4.2},
      { name: "소고기미역국", score: 4.3 },
      { name: "도토리묵", score: 4.5 },
    ],
  },
  {
    id: 6,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-04",
    time: "중식",
    mainMenu: [
      { name: "전주식 비빔밥", score: 4 },
      { name: "제육볶음", score: 4 },
      { name: "샐러드", score: 4.1 },
    ],
  },
  {
    id: 7,
    restaurant: "학생식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-04",
    time: "중식",
    mainMenu: [
      { name: "짜장면", score: 4.8},
      { name: "미역줄기볶음", score: 4 },
      { name: "요구르트", score: 4.5 },
    ],
  },
  {
    id: 8,
    restaurant: "창업보육센터",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-07",
    time: "석식",
    mainMenu: [
      { name: "순대국밥", score: 4.5 },
      { name: "조기구이", score: 4 },
      { name: "미트볼스파게티", score: 4.5 },
    ],
  },
  {
    id: 9,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-05",
    time: "조식",
    mainMenu: [
      { name: "꼬치어묵짬뽕순두부", score: 4.3 },
      { name: "군만두튀김", score: 4.9 },
    ],
  },
  {
    id: 10,
    restaurant: "학생식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-05",
    time: "중식",
    mainMenu: [
      { name: "불닭덮밥", score: 4.3 },
      { name: "메밀전병", score: 4.9 },
      { name: "김치볶음밥", score: 4.5 },
    ],
  },
  {
    id: 11,
    restaurant: "창업보육센터",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-05",
    time: "중식",
    mainMenu: [
      { name: "김치돈육볶음", score: 4.3 },
      { name: "청양초콩나물국", score: 4.9 },
      { name: "연두부", score: 4.5 },
    ],
  },
  {
    id: 12,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-05",
    time: "중식",
    mainMenu: [
      { name: "함박스테이크", score: 4.3 },
      { name: "마늘쫑무침", score: 4.9 },
      { name: "핫도그", score: 4.5 },
    ],
  },
  {
    id: 13,
    restaurant: "학생식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-05",
    time: "중식",
    mainMenu: [
      { name: "쫄면무침", score: 4.3 },
      { name: "생선까스", score: 4.9 },
    ],
  },
  {
    id: 14,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-05",
    time: "석식",
    mainMenu: [
      { name: "부대찌개", score: 4.3 },
      { name: "맛살브로콜리볶음", score: 4.9 },
    ],
  },
  {
    id: 15,
    restaurant: "창업보육센터",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-05",
    time: "석식",
    mainMenu: [
      { name: "춘천닭갈비덮밥", score: 4.3 },
      { name: "새송이버섯볶음", score: 4.9 },
      { name: "동그랑땡", score: 4.5 },
    ],
  },
  {
    id: 16,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-06",
    time: "조식",
    mainMenu: [
      { name: "왕만두육개장", score: 4.3 },
      { name: "치킨마요덮밥", score: 4.9 },
      { name: "천사채샐러드", score: 4.5 },
    ],
  },
  {
    id: 17,
    restaurant: "학생식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-06",
    time: "중식",
    mainMenu: [
      { name: "해물짬뽕", score: 4.3 },
      { name: "김가루무침", score: 4.9 },
    ],
  },
  {
    id: 18,
    restaurant: "창업보육센터",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-06",
    time: "중식",
    mainMenu: [
      { name: "뼈없는 감자탕", score: 4.3 },
      { name: "중화볶음밥", score: 4.9 },
      { name: "소떡소떡", score: 4.5 },
    ],
  },
  {
    id: 19,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-06",
    time: "중식",
    mainMenu: [
      { name: "데리야끼돈불고기볶음", score: 4.3 },
      { name: "유부장국", score: 4.9 },
      { name: "탕수육", score: 4.5 },
    ],
  },
  {
    id: 20,
    restaurant: "교직원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-06",
    time: "중식",
    mainMenu: [
      { name: "들깨미역국", score: 4.3 },
      { name: "야채비빔만두", score: 4.9 },
      { name: "양념깻잎지", score: 4.5 },
    ],
  },
  {
    id: 21,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-06",
    time: "석식",
    mainMenu: [
      { name: "야채참치비빔밥", score: 4.3 },
      { name: "달걀후라이", score: 4.9 },
      { name: "김자반", score: 4.5 },
    ],
  },
  {
    id: 22,
    restaurant: "창업보육센터",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-06",
    time: "석식",
    mainMenu: [
      { name: "카레라이스", score: 4.3 },
      { name: "꽈배기", score: 4.9 },
      { name: "돈육김치볶음", score: 4.5 },
    ],
  },
  {
    id: 23,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-07",
    time: "조식",
    mainMenu: [
      { name: "마파두부덮밥", score: 4.3 },
      { name: "유부장국", score: 4.9 },
      { name: "동그랑땡", score: 4.5 },
    ],
  },
  {
    id: 24,
    restaurant: "창의인재원식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-07",
    time: "중식",
    mainMenu: [
      { name: "마제덮밥", score: 4.3 },
      { name: "고구마맛탕", score: 4.9 },
    ],
  },
  {
    id: 25,
    restaurant: "학생식당",
    imageUrl: image,
    rating: 4.3,
    date: "2024-11-07",
    time: "중식",
    mainMenu: [
      { name: "돈육 고추장 볶음", score: 4.3 },
      { name: "미역국", score: 4.9 },
      { name: "콩나물무침", score: 4.5 },
    ],
  },



  // 추가 식당 데이터를 여기에 추가할 수 있습니다.
];

export default menuData;
