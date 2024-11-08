import { useState, useEffect } from 'react';
import DiningSelector from './diningSelector';
import logo from '../../assets/weekly/logo.webp'
import morning from '../../assets/weekly/morning.jpg'
import lunch from '../../assets/weekly/lunch.jpg'
import dinner from '../../assets/weekly/dinner.jpg'
import MenuCard from './menuCard';
import { menuData } from './menuData';
import MenuCardAll from './menuCardAll';
import noimage from '../../assets/weekly/noImage.jpg'

const getDateForSelectedDay = (selectedDay: string) => {
  const today = new Date();
  const todayDayIndex = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const targetDayIndex = ['일', '월', '화', '수', '목', '금', '토'].indexOf(selectedDay);
  const difference = targetDayIndex - todayDayIndex;
  
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + difference);
  return `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1).toString().padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`;
};

export const WeeklyMenuPage = () => {
  const [selectedDay, setSelectedDay] = useState<string>('월');
  const [selectedDining, setSelectedDining] = useState<string>('전체');

  // 선택한 요일에 맞는 날짜 설정
  const currentDate = getDateForSelectedDay(selectedDay);

  // 선택한 식당과 날짜에 맞는 메뉴 필터링
  const filteredMenuData = (time: string) => {
    return menuData.filter(
      (menu) =>
        menu.date === currentDate &&
        (selectedDining === '전체' || menu.restaurant === selectedDining) &&
        menu.time === time
    );
  };

  useEffect(() => {
    const today = new Date();
    const todayDayIndex = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const todayDay = ['일', '월', '화', '수', '목', '금', '토'][todayDayIndex];
    setSelectedDay(todayDay);
  }, []);

  return (
    <div className="p-[8px] font-[Noto Sans] bg-white">
      <div className='flex justify-center items-center mt-[12px] mb-[20px]'>
        <img src={logo} alt="학식하냥" className='w-[100px] h-[22px]' />
      </div>
      
      {/* DiningSelector 컴포넌트를 추가하고, 상태 전달 */}
      <DiningSelector
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedDining={selectedDining}
        setSelectedDining={setSelectedDining}
      />

      <div className="flex gap-[4px] items-center justify-start">
        <img src={morning} alt="조식메뉴" className='h-[26px] mr-[4px]'/>
        <div className='text-[12px] text-[#F08A01] font-bold' >아침</div>
        <div className='text-[12px] font-regular' >08:00 - 09:00</div>
      </div>
      <div className="mt-[12px] mb-[12px]">
        {filteredMenuData('조식').length > 0 ? (
          filteredMenuData('조식').map((menu, index) =>
            selectedDining === '전체' ? (
              <MenuCardAll
                key={index}
                restaurant={menu.restaurant}
                rating={menu.rating}
                menuItems={menu.mainMenu}
              />
            ) : (
              <MenuCard
                key={index}
                imageSrc={menu.imageUrl}
                rating={menu.rating}
                menuItems={menu.mainMenu}
              />
            )
          )
        ) : (
            <MenuCard
              imageSrc={noimage}
            />
        )}
      </div>

      <div className="flex gap-[4px] items-center justify-start">
        <img src={lunch} alt="중식메뉴" className='h-[26px] mr-[4px]' />
        <div className='text-[12px] text-[#F08A01] font-bold'>점심</div>
        <div className='text-[12px] font-regular'>11:30 - 13:20</div>
      </div>
      <div className="mt-[12px] mb-[12px]">
        {filteredMenuData('중식').length > 0 ? (
          filteredMenuData('중식').map((menu, index) =>
            selectedDining === '전체' ? (
              <MenuCardAll
                key={index}
                restaurant={menu.restaurant}
                rating={menu.rating}
                menuItems={menu.mainMenu}
              />
            ) : (
              <MenuCard
                key={index}
                imageSrc={menu.imageUrl}
                rating={menu.rating}
                menuItems={menu.mainMenu}
              />
            )
          )
        ) : (
            <MenuCard
              imageSrc={noimage}
            />
        )}
      </div>

      <div className="flex gap-[4px] items-center justify-start">
        <img src={dinner} alt="석식메뉴" className='h-[26px] mr-[4px]' />
        <div className='text-[12px] text-[#F08A01] font-bold'>저녁</div>
        <div className='text-[12px] font-regular'>17:00 - 18:40</div>
      </div>
      <div className="mt-[12px] mb-[12px]">
        {filteredMenuData('석식').length > 0 ? (
          filteredMenuData('석식').map((menu, index) =>
            selectedDining === '전체' ? (
              <MenuCardAll
                key={index}
                restaurant={menu.restaurant}
                rating={menu.rating}
                menuItems={menu.mainMenu}
              />
            ) : (
              <MenuCard
                key={index}
                imageSrc={menu.imageUrl}
                rating={menu.rating}
                menuItems={menu.mainMenu}
              />
            )
          )
        ) : (
            <MenuCard
              imageSrc={noimage}
            />
        )}
      </div>
    </div>
  );
};

export default WeeklyMenuPage;
