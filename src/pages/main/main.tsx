import { useState, useEffect, useRef } from 'react';
import LogoImage from "@assets/main/logo.webp";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
import NoImage from "@assets/main/NoImage.webp";
import { getAllRestaurants, getMenusByRestaurantAndDate } from '@apis/mainApi';

export const MainPage = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [mealTime, setMealTime] = useState<string>('');
  const [restaurants, setRestaurants] = useState<any[]>([]); // 초기값을 빈 배열로 설정
  const [menus, setMenus] = useState<any[]>([]);
  const [selectedStoreIndex, setSelectedStoreIndex] = useState<number | null>(null); // 선택된 식당 
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [date, setDate] = useState<string>('2024-10-29');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); 
  const navigate = useNavigate(); //페이지 이동하기

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantData = await getAllRestaurants();
        if (Array.isArray(restaurantData)) {
          setRestaurants(restaurantData);
          if (restaurantData.length > 0) {
            fetchMenus(restaurantData[0].name, 0); // 첫 번째 식당의 메뉴 보일 수 있게.
            setSelectedStoreIndex(0); // 첫 번째 식당 버튼을 선택 상태로 설정
          }
        } else {
          console.error("Expected an array but got:", restaurantData);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const fetchMenus = async (restaurant: string, index: number) => {
    const menuData = await getMenusByRestaurantAndDate(restaurant, date);
    setMenus(menuData);
    setSelectedRestaurant(restaurant);
    setSelectedStoreIndex(index); // 선택된 식당 인덱스 업데이트
  };

  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, 
    centerPadding: '28px', //옆에 메뉴 살짝 미리보기 할 수 있게
    swipeToSlide: true, 
    touchThreshold: 10,
    draggable: true, 
    afterChange: (current: number) => {
      setCurrentSlideIndex(current); 
    },
  };

  //시간 설정하기
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString(undefined, options));

      const hours = now.getHours();
      if (hours >= 0 && hours < 10) {
        setMealTime('아침');
      } else if (hours >= 10 && hours < 14) {
        setMealTime('점심');
      } else {
        setMealTime('저녁');
      }
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // 매 분마다 업데이트하기

    return () => clearInterval(interval);
  }, []);



  const handleStoreClick = (id : number) => {
    navigate(`/main-detail/${id}`);
    };

  



  return (
    <div style={{ textAlign: 'center', width: '100%', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
        <img src={LogoImage} style={{ width: '88px', height: 'auto', marginBottom: '12px', marginTop: '12px' }} />
    </div>
    {/*날짜, 식사 표시*/}
    <div style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '12px', marginLeft:'8px'}}>
        {`${currentDate} 식단 - `}
        <span style={{ 
          color: mealTime === '아침' ? '#94C120' : 
          mealTime === '점심' ? '#F08A01' : 
          mealTime === '저녁' ? '#888C8D' : 
          'black'  //기본색 (값이 없을때)
  }}>
    {mealTime}
    </span>
      </div>

    
    <div className="slider-container" style={{ height: '500px', margin: '0 auto', alignItems: 'left', padding: '0px' }}>
      <Slider ref={sliderRef} {...settings}>
        {menus.map((menu) => (
          <div key={menu.id} className="slide" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: '320px', margin: '4px' }}>
            <div style={{ width: '300px', height: '482px', margin: '10px', marginBottom: '20px', boxShadow: '0 0px 20px rgba(0,0,0,0.1)', borderRadius: '12px' }}
            onClick={() => handleStoreClick(menu.id)}>
              <img src={NoImage} className="menu-image" style={{width:'328px', height:'auto',alignItems: 'center'}} />
              <ul style={{ width: '304px', height: '72px', marginBottom: '8px' }}>
                {menu.foods.map((food : string, index : number) => (
                  <li key={index} style={{ display: 'flex', height: '24px', width: '300px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      • {food}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </Slider>
    </div>



      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 8px', marginTop: '14px' }}>
        {restaurants.map((restaurant, index) => (
          <button key={restaurant.id} onClick={() => fetchMenus(restaurant.name, index)}
          style={{
            width: '160px',
            height: '40px',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            fontSize: '14px',
            fontWeight: selectedStoreIndex === index ? '900' : '500',
            color: selectedStoreIndex === index ? '#134B84' : '#6A6A6A',
            border: selectedStoreIndex === index ? '2px solid #134B84' : '1px solid #6A6A6A',
            cursor: 'pointer',
          }}>
            {restaurant.name}
          </button>
        ))}
      </div>
    </div>
  );
};
