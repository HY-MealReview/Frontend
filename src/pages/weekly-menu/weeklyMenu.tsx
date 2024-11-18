import { useState, useEffect } from "react";
import DiningSelector from "./diningSelector";
import logo from "../../assets/weekly/logo.webp";
import morning from "../../assets/weekly/morning.jpg";
import lunch from "../../assets/weekly/lunch.jpg";
import dinner from "../../assets/weekly/dinner.jpg";
import MenuCard from "./menuCard";
import MenuCardAll from "./menuCardAll";
import noimage from "../../assets/weekly/noImage.jpg";
import { getMenu, getMenuByRestaurantAndDate } from "../../apis/weekly";
import noImage from "../../assets/weekly/noImage.jpg";

interface Menu {
  menu_id: number;
  menu_date: string; // 메뉴 날짜
  restaurant_name: string; // 식당 이름
  time: string; // 식사 시간 (조식/중식/석식)
  foods: {
    id: number;
    name: string;
    average_rating: number;
  }[]; // 음식 정보 배열
}

interface ImageResponse {
  id: number;
  restaurant: string; // 식당 이름
  date: string; // 메뉴 날짜
  time: string; // 식사 시간 (조식/중식/석식)
  photo: string; // 이미지 경로
}

export const WeeklyMenuPage = () => {
  const [selectedDay, setSelectedDay] = useState<string>("월");
  const [selectedDining, setSelectedDining] = useState<string>("전체");
  const [menuData, setMenuData] = useState<any[]>([]);

  // 주어진 날짜에서 해당 주의 월요일 날짜 계산
  const getMonday = (date: Date) => {
    const day = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const diff = day === 0 ? -6 : 1 - day; // 일요일인 경우 지난 월요일로 이동
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  };

  // 선택한 요일의 날짜 계산
  const getDateForSelectedDay = (selectedDay: string) => {
    const today = new Date();
    const monday = getMonday(today); // 이번 주 월요일 계산
    const targetDayIndex = ["월", "화", "수", "목", "금", "토", "일"].indexOf(
      selectedDay
    );
    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + targetDayIndex); // 월요일 기준으로 선택한 요일 더함
    return `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${targetDate.getDate().toString().padStart(2, "0")}`;
  };

  const currentDate = getDateForSelectedDay(selectedDay);

  useEffect(() => {
    const today = new Date();
    const todayDayIndex = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const todayDay = ["일", "월", "화", "수", "목", "금", "토"][todayDayIndex];
    setSelectedDay(todayDay);
  }, []);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        if (selectedDining === "전체") {
          const restaurants = [
            "학생식당",
            "창업보육센터",
            "창의인재원식당",
            "교직원식당",
          ];
          // 모든 식당 데이터를 병렬로 가져오기
          const allData = await Promise.all(
            restaurants.map((restaurant) => getMenu(restaurant, currentDate))
          );
          // 응답 데이터를 병합
          const mergedData = allData.flat();
          setMenuData(mergedData);
        } else {
          // 특정 식당 데이터 가져오기
          const data = await getMenu(selectedDining, currentDate);
          const imageresponse = await getMenuByRestaurantAndDate(
            selectedDining,
            currentDate
          );
          console.log(data)
          console.log(imageresponse)
          const mergedData = data.map((menu: Menu) => {
            // imageresponse에서 menu와 매칭되는 항목을 찾음
            const matchingImage = imageresponse.find(
              (image: ImageResponse) =>
                image.restaurant === menu.restaurant_name &&
                image.date === menu.menu_date &&
                image.time === menu.time && image.id === menu.menu_id
            );
            console.log(matchingImage);
            return {
              ...menu, // 기존 menu 데이터
              photo: matchingImage?.photo || noImage, // 매칭된 photo 추가
            };
          });

          const filteredFoods = mergedData.map((menu: Menu) => {
            if (menu.foods && menu.foods.length > 0) {
              const uniqueFoods = menu.foods.filter(
                (food, index, self) =>
                  index === self.findIndex((f) => f.id === food.id)
              );
              return { ...menu, foods: uniqueFoods };
            }
            return menu;
          });
  
          console.log(filteredFoods);
          setMenuData(filteredFoods);
        }
      } catch (error) {
        console.error("메뉴 데이터를 가져오는데 실패했습니다.", error);
        setMenuData([]); // 데이터 가져오기 실패 시
      }
    };

    if (currentDate) {
      fetchMenuData();
    }
  }, [currentDate, selectedDining]);

  const filteredMenuData = (time: string) => {
    if (!Array.isArray(menuData)) {
      console.log("menuData가 배열이 아닙니다. 빈 배열을 반환합니다.");
      return [];
    }
    return menuData
      .filter((menu) => menu && menu.time) // menu와 menu.time이 모두 존재하는지 확인
      .filter((menu) => menu.time === time); // 원하는 time에 따라 필터링
  };

  return (
    <div className="p-[8px] font-[Noto Sans] bg-white">
      <div className="flex justify-center items-center mt-[12px] mb-[20px]">
        <img src={logo} alt="학식하냥" className="w-[100px] h-[22px]" />
      </div>

      {/* DiningSelector 컴포넌트를 추가하고, 상태 전달 */}
      <DiningSelector
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedDining={selectedDining}
        setSelectedDining={setSelectedDining}
      />

      {/* 조식 */}
      <div className="flex gap-[4px] items-center justify-start">
        <img src={morning} alt="조식메뉴" className="h-[26px] mr-[4px]" />
        <div className="text-[12px] text-[#F08A01] font-bold">아침</div>
        <div className="text-[12px] font-regular">08:00 - 09:00</div>
      </div>
      <div className="mt-[12px] mb-[12px]">
        {filteredMenuData("조식").length > 0 ? (
          filteredMenuData("조식").map((menu, index) =>
            selectedDining === "전체" ? (
              <MenuCardAll
                key={index}
                restaurant={menu.restaurant_name}
                menuItems={menu.foods}
              />
            ) : (
              <MenuCard
                key={index}
                imageSrc={menu.photo}
                menuItems={menu.foods}
              />
            )
          )
        ) : (
          <MenuCard imageSrc={noimage} />
        )}
      </div>

      {/* 중식 */}
      <div className="flex gap-[4px] items-center justify-start">
        <img src={lunch} alt="중식메뉴" className="h-[26px] mr-[4px]" />
        <div className="text-[12px] text-[#F08A01] font-bold">점심</div>
        <div className="text-[12px] font-regular">11:30 - 13:20</div>
      </div>
      <div className="mt-[12px] mb-[12px]">
        {filteredMenuData("중식").length > 0 ? (
          filteredMenuData("중식").map((menu, index) =>
            selectedDining === "전체" ? (
              <MenuCardAll
                key={index}
                restaurant={menu.restaurant_name}
                menuItems={menu.foods}
              />
            ) : (
              <MenuCard
                key={index}
                imageSrc={menu.photo}
                menuItems={menu.foods}
              />
            )
          )
        ) : (
          <MenuCard imageSrc={noimage} />
        )}
      </div>

      {/* 석식 */}
      <div className="flex gap-[4px] items-center justify-start">
        <img src={dinner} alt="석식메뉴" className="h-[26px] mr-[4px]" />
        <div className="text-[12px] text-[#F08A01] font-bold">저녁</div>
        <div className="text-[12px] font-regular">17:00 - 18:40</div>
      </div>
      <div className="mt-[12px] mb-[12px]">
        {filteredMenuData("석식").length > 0 ? (
          filteredMenuData("석식").map((menu, index) =>
            selectedDining === "전체" ? (
              <MenuCardAll
                key={index}
                restaurant={menu.restaurant_name}
                menuItems={menu.foods}
              />
            ) : (
              <MenuCard
                key={index}
                imageSrc={menu.photo}
                menuItems={menu.foods}
              />
            )
          )
        ) : (
          <MenuCard imageSrc={noimage} />
        )}
      </div>
    </div>
  );
};

export default WeeklyMenuPage;
