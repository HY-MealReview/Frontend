import menuImage from "@assets/main/menuImage.webp";
import NoImage from "@assets/main/NoImage.webp";

//메뉴 데이터
export interface MenuItem {
    name: string; //이름
  }
  
  //식당 정보들 - 식당 이름, 메뉴 이미지, 메뉴들
  export interface Store {
    id: number;
    name: string; //식당 이름
    imageUrl: string; //메뉴 이미지
    mainMenu: MenuItem[]; //메뉴 종류
    time: string; //운영 시간
    location: string; //식당 위치
  }

export const stores : Store[] =[
    {
        id: 1,
        name: "학생 식당",
        time: "17:00~22:00",
        location: "학생복지관 2층",
        imageUrl: menuImage,
        mainMenu: [
          { name: "전주식 콩나물 해장국" },
          { name: "전주식 콩나물 해장국" },
          { name: "전주식 콩나물 해장국" }
        ],
      },
      {
        id: 2,
        name: "창업보육센터",
        time: "17:00~22:00",
        location: "학생복지관 2층",
        imageUrl: menuImage,
        mainMenu: [
          { name: "창보 학식" },
          { name: "창보 학식" }
        ],
      },

      {
        id: 3,
        name: "창의인재원 식당",
        time: "17:00~22:00",
        location: "학생복지관 2층",
        imageUrl: NoImage,
        mainMenu: [
          { name: "긱사 식당" },
          { name: "긱사 식당" },
          { name: "긱사 식당" }
        ],
      },

      {
        id: 4,
        name: "교직원 식당",
        time: "17:00~22:00",
        location: "학생복지관 2층",
        imageUrl: menuImage,
        mainMenu: [
          { name: "교식" },
          { name: "교식" },
         
        ],
      }

];