import { useState, useEffect, useRef } from 'react';
import LogoImage from "@assets/main/logo.webp";
import Recommend from "@assets/main/Recommend.webp";
import NoRecommend from "@assets/main/NoRecommend.webp";
import Star from "@assets/main/star.webp";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
import NoImage from "@assets/main/NoImage.webp";
import { getAllRestaurants, getMenusWithRatings, getRecommendCount, recommendMenu} from '@apis/mainApi';

export const MainPage = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [mealTime, setMealTime] = useState<string>('');
  const [restaurants, setRestaurants] = useState<any[]>([]); // 초기값을 빈 배열로 설정
  const [menus, setMenus] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [selectedStoreIndex, setSelectedStoreIndex] = useState<number | null>(null);
  const [date, setDate] = useState<string>('2024-10-29');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); 
  const [menuStates, setMenuStates] = useState<any[]>([]); // 메뉴 상태 관리
  const navigate = useNavigate(); //페이지 이동하기

  console.log(setDate);
  console.log(currentSlideIndex);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantData = await getAllRestaurants();
        if (Array.isArray(restaurantData)) {
          setRestaurants(restaurantData);
          if (restaurantData.length > 0) {
            console.log(restaurantData[0].name)
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
    try {
      const menuData = await getMenusWithRatings(restaurant, date);
      console.log("menuData:", menuData); // 전체 메뉴 데이터를 확인
  
      // 메뉴 데이터에서 각 메뉴의 time 값을 출력하여 확인
      menuData.forEach(menu => {
        console.log("menu.time:", menu.time); // 각 메뉴의 time 값 로그 출력
      });
  
      // mealTime이 설정되지 않았으면 기본적으로 '중식'으로 설정
      if (!mealTime) {
        setMealTime('중식'); // 기본 시간대 설정
      }
  
      // 시간대별 필터링 추가
      let filteredMenus = menuData.filter((menu) => {
        console.log("Filtering menu with time:", menu.time); // menu.time 값 확인
        console.log("Current mealTime:", mealTime); // mealTime 값 확인
  
        // mealTime이 null이 아니어야 필터링 진행
        if (mealTime && menu.time.trim().toLowerCase() === mealTime.trim().toLowerCase()) {
          return true; // 시간대가 맞다면 필터링
        } else {
          return false;
        }
      });
  
      // 만약 필터링된 메뉴가 없으면, 다른 시간대의 메뉴를 시도
      if (filteredMenus.length === 0) {
        console.log(`No ${mealTime} menus found. Trying with a different time.`);
        const alternateMealTime = mealTime === '석식' ? '중식' : '석식';
        filteredMenus = menuData.filter((menu) => {
          return menu.time.trim().toLowerCase() === alternateMealTime.trim().toLowerCase();
        });
      }
  
      console.log("filteredMenus:", filteredMenus); // 필터링된 메뉴 확인
  
      setMenus(filteredMenus);
      setSelectedRestaurant(restaurant);
      setSelectedStoreIndex(index); // 선택된 식당 인덱스 업데이트
  
      const initialStates = await Promise.all(
        filteredMenus.map(async (menu) => {
          try {
            const response = await getRecommendCount(menu.id);
            return response;
          } catch (error) {
            console.error(`Failed to fetch recommend count for menu ID ${menu.id}:`, error);
            return { true_count: 0, false_count: 0 }; // 기본값 반환
          }
        })
      );
  
      const updatedMenuStates = filteredMenus.map((menu, i) => ({
        id: menu,
        recommendCount: initialStates[i].true_count,
        notRecommendCount: initialStates[i].false_count,
        recommendationStatus: null,
        notRecommendationStatus: null,
      }));
  
      setMenuStates(updatedMenuStates);
  
    } catch (error) {
      console.error("fetchMenus에서 오류 발생:", error);
    }
  };
  


  // mealTime 값 확인용 로그
useEffect(() => {
  console.log("현재 mealTime 값:", mealTime); // mealTime 값 확인
}, [mealTime]);
  
  


  useEffect(() => {
    console.log( selectedStoreIndex);
      // selectedStoreIndex가 null이 아닌 경우에만 접근
      if (selectedStoreIndex !== null) {
    console.log("추천 카운트 확인: ", menuStates);
  }
    
  }, [menuStates, selectedStoreIndex]); // menuStates 또는 selectedStoreIndex가 바뀔 때마다 실행
  



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

  
// --- 1. 시간대 설정 로직 ---
useEffect(() => {
  // 처음 컴포넌트가 마운트될 때나 시간 변경 시 mealTime 설정
  const updateDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString(undefined, options));

    const hours = now.getHours();
    let newMealTime = mealTime;

    // 시간에 맞는 mealTime 설정
    if (hours >= 0 && hours < 11) {
      newMealTime = '조식';
    } else if (hours >= 11 && hours < 14) {
      newMealTime = '중식';
    } else if (hours >= 14 && hours < 24) {
      newMealTime = '석식';
    }
    
 // 처음 상태가 중식으로 잘못 설정될 수 있으므로, 
      // mealTime이 비어있으면 변경하는 코드 추가
      if (!mealTime) {
        setMealTime(newMealTime);
      } else if (mealTime !== newMealTime) {
        setMealTime(newMealTime);  // mealTime이 다르면 변경
      }
    };


  updateDateTime(); // 초기 실행
  const interval = setInterval(updateDateTime, 60000);  // 1분마다 갱신
  return () => clearInterval(interval);  // 컴포넌트 언마운트 시 클린업
}, []);  // 한 번만 실행되도록 빈 배열로 설정

useEffect(() => {
  // mealTime이 변경될 때마다 메뉴를 다시 불러오는 로직
  console.log("Filtering menu with time:", mealTime);  // 디버깅용 로그 추가
  if (selectedRestaurant && mealTime && selectedStoreIndex !== null) {
    console.log("Current mealTime:", mealTime);  // 디버깅용 로그 추가
    fetchMenus(selectedRestaurant, selectedStoreIndex);
  }
}, [mealTime, selectedRestaurant, selectedStoreIndex]);  // mealTime, selectedRestaurant, selectedStoreIndex 값이 변경될 때만 실행




 // 4. 시간대별 메뉴 업데이트 후, 메뉴가 없을 경우 메시지 표시
useEffect(() => {
  // mealTime이나 selectedRestaurant, selectedStoreIndex가 변경될 때마다 메뉴를 갱신합니다.
  if (selectedRestaurant && selectedStoreIndex !== null && mealTime) {
    fetchMenus(selectedRestaurant, selectedStoreIndex);  // mealTime 반영
  }
}, [mealTime, selectedRestaurant, selectedStoreIndex]);  // mealTime 의존성 추가



  const handleStoreClick = (menuId: number) => {
    const selectedMenuSet = menus.find(menu => menu.id === menuId);
    if (selectedMenuSet) {
      navigate(`/main-detail/${selectedMenuSet.restaurant}/${selectedMenuSet.date}`, { state: { selectedMenuSet,menuStates } });
    } else {
      console.error("Invalid menu ID:", menuId);
    }
  };
  


  const handleRecommendClick = async (index: number, menuId: number) => {
    const newStatus = menuStates[index]?.recommendationStatus === 'recommended' ? null : 'recommended';
    // 상태 업데이트
    const updatedMenuStates = [...menuStates];
    if (updatedMenuStates[index]) { // 존재하는 경우에만 업데이트
        updatedMenuStates[index].recommendationStatus = newStatus;
        if (newStatus) {
            updatedMenuStates[index].recommendCount += 1; // 추천 수 증가
        } else {
            updatedMenuStates[index].recommendCount -= 1; // 추천 수 감소
        }
        setMenuStates(updatedMenuStates);
    }
    // 백엔드에 요청 전송
      await recommendMenu(menuId, true);
};

const handleNotRecommendClick = async (index: number, menuId: number) => {
  const newStatus = menuStates[index]?.notRecommendationStatus === 'NotRecommended' ? null : 'NotRecommended';

  // 상태 업데이트
  const updatedMenuStates = [...menuStates];
  if (updatedMenuStates[index]) { // 존재하는 경우에만 업데이트
      updatedMenuStates[index].notRecommendationStatus = newStatus;
      if (newStatus) {
          updatedMenuStates[index].notRecommendCount += 1; // 비추천 수 증가
      } else {
          updatedMenuStates[index].notRecommendCount -= 1; // 비추천 수 감소
      }
      setMenuStates(updatedMenuStates);
  }

  // 백엔드에 요청 전송
 
    await recommendMenu(menuId, false);

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
        color: mealTime === '조식' ? '#94C120' : 
        mealTime === '중식' ? '#F08A01' : 
        mealTime === '석식' ? '#888C8D' : 
        'black'  //기본색 (값이 없을때)
      }}>
        {mealTime}
      </span>
    </div>

    <div className="slider-container" style={{ height: '500px', margin: '0 auto', alignItems: 'left', padding: '0px' }}>
      <Slider ref={sliderRef} {...settings}>
        
        {menus.length === 0 ? (
          // 메뉴가 없을 때 처리
          <div className="slide" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: '320px', margin: '4px' }}>
            <div style={{ width: '300px', height: '482px', margin: '10px', marginBottom: '20px', boxShadow: '0 0px 20px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
              <img src={NoImage} className="menu-image" style={{ width: '328px', height: 'auto', alignItems: 'center' }} />
              <div style={{ margin: '12px', fontSize: '18px', color: '#888' }}>
                준비된 메뉴가 없습니다
              </div>
            </div>
          </div>
        ) : (
          // 메뉴가 있을 때 기존 처리
          menus.map((menu, index) => (
            <div key={menu.id} className="slide" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: '320px', margin: '4px' }}>
              <div style={{ width: '300px', height: '482px', margin: '10px', marginBottom: '20px', boxShadow: '0 0px 20px rgba(0,0,0,0.1)', borderRadius: '12px' }}
                onClick={() => handleStoreClick(menu.id)}>
                <img src={NoImage} className="menu-image" style={{ width: '328px', height: 'auto', alignItems: 'center' }} />
                <div style={{ margin: '12px' }}>
                  <ul style={{ width: '280px', height: '72px', marginBottom: '8px' }}>
                    {menu.foods.map((food: { name: string; average_rating: number }, foodIndex: number) => (
                      <li key={foodIndex} style={{ display: 'flex', height: '24px', width: '270px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          • {food.name} {/* 음식 이름 */}
                        </div>
                        <div style={{ textAlign: 'right', alignItems: 'center', display: 'flex', justifyItems: 'center' }}>
                          <img src={Star} style={{ width: '16px', height: '16px', marginRight: '5px' }} />
                          {food.average_rating ? food.average_rating.toFixed(1) : 'N/A'} {/* 평점 표시 */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div key={menu.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#444444', marginBottom: '12px', marginRight: '20px' }}>
                      추천 {menuStates[index]?.recommendCount}
                      <div
                        className="like-button"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '120px',
                          height: '104px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: menuStates[index]?.recommendationStatus === 'recommended' ? 'bold' : 'normal',
                          color: menuStates[index]?.recommendationStatus === 'recommended' ? '#134B84' : '#6A6A6A',
                          border: menuStates[index]?.recommendationStatus === 'recommended' ? '2px solid #134B84' : '1px solid #F0F0F0',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '9px',
                        }}
                        onClick={(event) => {
                          event.stopPropagation(); // 클릭 이벤트 전파 방지
                          handleRecommendClick(index, menu.id);
                        }}>
                        <img src={Recommend} style={{ width: '48px', height: 'auto', padding: '6px' }} alt="추천" />
                        추천
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#444444', marginBottom: '12px' }}>
                      비추천 {menuStates[index]?.notRecommendCount}
                      <div
                        style={{
                          width: '120px',
                          height: '104px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: menuStates[index]?.notRecommendationStatus === 'NotRecommended' ? 'bold' : 'normal',
                          color: menuStates[index]?.notRecommendationStatus === 'NotRecommended' ? '#134B84' : '#6A6A6A',
                          border: menuStates[index]?.notRecommendationStatus === 'NotRecommended' ? '2px solid #134B84' : '1px solid #F0F0F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onClick={(event) => {
                          event.stopPropagation(); // 클릭 이벤트 전파 방지
                          handleNotRecommendClick(index, menu.id);
                        }}>
                        <img src={NoRecommend} style={{ width: '48px', height: 'auto', padding: '6px' }} alt="추천" />
                        비추천
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </Slider>
    </div>

    {/* 식당 선택 버튼 */}
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