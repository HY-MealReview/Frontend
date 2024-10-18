import menuImage from "@assets/main/menuImage.webp";

//메뉴 데이터
export interface MenuItem {
    name: string; //이름
  }
  
  //식당 정보들 - 식당 이름, 메뉴 이미지, 메뉴들
  export interface Store {
    id: number;
    title :string;
    name: string; //식당 이름
    imageUrl: string; //메뉴 이미지
    mainMenu: MenuItem[]; //메뉴 종류
    time: string; //운영 시간
    location: string; //식당 위치
    date : string; //날짜
  }

export const stores : Store[] =[
    {
        id: 1,
        title : '점심',
        name: "학생 식당",
        time: "17:00~22:00",
        location: "학생복지관 2층",
        imageUrl: menuImage,
        mainMenu: [
          { name: "전주식 콩나물 해장국" },
          { name: "전주식 콩나물 해장국" },
          { name: "전주식 콩나물 해장국" }
        ],
        date : "10월 349일 식단"
      },
      {
        id: 2,
        title : '저녁',

        name: "학생 식당",
        time: "17:00~22:00",
        location: "학생복지관 2층",
        imageUrl: menuImage,
        mainMenu: [
          { name: "전주식 콩나물 해장국" },
          { name: "전주식 콩나물 해장국" },
          { name: "전주식 콩나물 해장국" }
        ],
        date : "2100년 10월 350일"
      }

];