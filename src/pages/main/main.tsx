import { useState, useEffect, useRef } from "react";
import LogoImage from "@assets/main/logo.webp";
import Recommend from "@assets/main/Recommend.webp";
import RecommendClick from '@assets/main/RecommendedClicked.webp';
import NoRecommend from "@assets/main/NoRecommend.webp";
import NoRecommendClicked from "@assets/main/NoRecommendClicked.webp"
import Star from "@assets/main/star.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import NoImage from "@assets/main/NoImage.webp";
import {
  createRecommend,updateRecommend, deleteRecommend,getUserRecommendation,
  getMenusWithRatings,
  getRecommendCount,
} from "@apis/mainApi";

// 날짜를 `YYYY-MM-DD` 형식으로 포맷하는 함수
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const MainPage = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [mealTime, setMealTime] = useState<string>("");
  const [restaurants, setRestaurants] = useState<any[]>([]); // 초기값을 빈 배열로 설정
  const [menus, setMenus] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [selectedStoreIndex, setSelectedStoreIndex] = useState<number | null>(null);
  const [date, setDate] = useState<string>(formatDate(new Date())); // 현재 날짜로 초기화
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [menuStates, setMenuStates] = useState<any[]>([]); // 메뉴 상태 관리
  const navigate = useNavigate(); //페이지 이동하기

  console.log(currentSlideIndex);

  const restaurantData = [
    { id: 1, name: "창의인재원식당" },
    { id: 2, name: "교직원식당" },
    { id: 3, name: "학생식당" },
    { id: 4, name: "창업보육센터" },
  ];


    // --- 1. 시간대 설정 로직 ---
    useEffect(() => {
      // 처음 컴포넌트가 마운트될 때나 시간 변경 시 mealTime 설정
      const updateDateTime = () => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          month: "long",
          day: "numeric",
        };
        setCurrentDate(now.toLocaleDateString(undefined, options));
  
        const hours = now.getHours();
        let newMealTime = mealTime;
  
        // 시간에 맞는 mealTime 설정
        if (hours >= 0 && hours < 10) {
          newMealTime = "조식";
        } else if (hours >= 10 && hours < 15) {
          newMealTime = "중식";
        } else if (hours >= 15 && hours < 24) {
          newMealTime = "석식";
        }
        // mealTime이 비어있으면 변경하는 코드 추가
        if (!mealTime) {
          setMealTime(newMealTime);
        } else if (mealTime !== newMealTime) {
          setMealTime(newMealTime); // mealTime이 다르면 변경
        }
      };
  
      updateDateTime(); // 초기 실행
      const interval = setInterval(updateDateTime, 60000); // 1분마다 갱신
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 클린업
    }, []); // 한 번만 실행되도록 빈 배열로 설정
  
    useEffect(() => {
      // mealTime이 변경될 때마다 메뉴를 다시 불러오는 로직
      if (selectedRestaurant && mealTime && selectedStoreIndex !== null) {
        fetchMenus(selectedRestaurant, selectedStoreIndex);
      }
    }, [mealTime, selectedRestaurant, selectedStoreIndex]); // mealTime, selectedRestaurant, selectedStoreIndex 값이 변경될 때만 실행
  
    // 4. 시간대별 메뉴 업데이트 후, 메뉴가 없을 경우 메시지 표시
    useEffect(() => {
      if (selectedRestaurant && selectedStoreIndex !== null && mealTime) {
        fetchMenus(selectedRestaurant, selectedStoreIndex); // mealTime 반영
      }
    }, [mealTime, selectedRestaurant, selectedStoreIndex]); // mealTime 의존성 추가

  // 날짜가 갱신될 때마다 동기화
  useEffect(() => {
    const today = new Date();
    setDate(formatDate(today)); // 오늘 날짜로 설정
    fetchRestaurants();
    fetchMenus(restaurantData[0].name, 0);
  }, []);

  const fetchRestaurants = async () => {
    try {
      if (Array.isArray(restaurantData)) {
        setRestaurants(restaurantData);
        if (restaurantData.length > 0) {
           // 첫 번째 식당의 메뉴 보일 수 있게.
          setSelectedStoreIndex(0); // 첫 번째 식당 버튼을 선택 상태로 설정
        }
      } else {
        console.error("Expected an array but got:", restaurantData);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  
  const fetchMenus = async (restaurant: string, index: number) => {
    try {
      console.log("fetchMenus 실행")
      const menuData = await getMenusWithRatings(restaurant, date); // 동적으로 업데이트된 date 사용
  
      // 시간대별 필터링 추가
      let filteredMenus = menuData.filter((menu) => {
        return (
          mealTime &&
          menu.time.trim().toLowerCase() === mealTime.trim().toLowerCase()
        );
      });
  
      // 필터링된 메뉴가 없을 경우 다른 시간대의 메뉴를 시도
      if (filteredMenus.length === 0) {
        const alternateMealTime = mealTime === "석식" ? "조식" : "석식";
        filteredMenus = menuData.filter((menu) => {
          return (
            menu.time.trim().toLowerCase() ===
            alternateMealTime.trim().toLowerCase()
          );
        });
      }
  
      setMenus(filteredMenus);
      setSelectedRestaurant(restaurant);
      setSelectedStoreIndex(index);
      // 새 상태를 생성하면서 기존 상태를 반영
      const initialStates = await Promise.all(
        filteredMenus.map(async (menu) => {
          const recommendData = await getRecommendCount(menu.id);
          const userRecommendation = await getUserRecommendation(menu.id);
          return {
            id: menu.id,
            recommendCount: recommendData.true_count || 0,
            notRecommendCount: recommendData.false_count || 0,
            recommendationStatus: userRecommendation?.recommendation ? "recommended" : null,
            notRecommendationStatus: userRecommendation?.recommendation === false ? "notRecommended" : null,
          };
        })
      );
      setMenuStates(initialStates);
    } catch (error) {
      console.error("fetchMenus에서 오류 발생:", error);
    }
  };


//추천 핸들러
const handleRecommendClick = async (index: number, menu_id: number) => {
  const currentStatus = menuStates[index]?.recommendationStatus;
  const updatedMenuStates = [...menuStates];

  if (currentStatus === "recommended") {
    // 현재 추천 상태 -> 추천 취소
    updatedMenuStates[index].recommendationStatus = null;
    updatedMenuStates[index].recommendCount -= 1;
    setMenuStates(updatedMenuStates);

    await deleteRecommend(menu_id); // 추천 삭제
  } else {
    // 현재 추천 상태가 아니거나 null -> 추천 활성화
    if (updatedMenuStates[index]?.notRecommendationStatus === "notRecommended") {
      // 비추천 상태였다면 비추천 취소
      updatedMenuStates[index].notRecommendationStatus = null;
      updatedMenuStates[index].notRecommendCount -= 1;
      await deleteRecommend(menu_id);
    }

    updatedMenuStates[index].recommendationStatus = "recommended";
    updatedMenuStates[index].recommendCount += 1;
    setMenuStates(updatedMenuStates);

    if (currentStatus === null) {
      // 최초 추천 생성
      await createRecommend(menu_id, true);
    } else {
      // 기존 추천 상태 업데이트
      await updateRecommend(menu_id, true);
    }
  }
};
//비추천 핸들러 
const handleNotRecommendClick = async (index: number, menu_id: number) => {
  const currentStatus = menuStates[index]?.notRecommendationStatus;
  const updatedMenuStates = [...menuStates];

  if (currentStatus === "notRecommended") {
    // 현재 비추천 상태 -> 비추천 취소
    updatedMenuStates[index].notRecommendationStatus = null;
    updatedMenuStates[index].notRecommendCount -= 1;
    setMenuStates(updatedMenuStates);

    await deleteRecommend(menu_id); // 비추천 삭제
  } else {
    // 현재 비추천 상태가 아니거나 null -> 비추천 활성화
    if (updatedMenuStates[index]?.recommendationStatus === "recommended") {
      // 추천 상태였다면 추천 취소
      updatedMenuStates[index].recommendationStatus = null;
      updatedMenuStates[index].recommendCount -= 1;
      await deleteRecommend(menu_id);
    }

    updatedMenuStates[index].notRecommendationStatus = "notRecommended";
    updatedMenuStates[index].notRecommendCount += 1;
    setMenuStates(updatedMenuStates);

    if (currentStatus === null) {
      // 최초 비추천 생성
      await createRecommend(menu_id, false);
    } else {
      // 기존 비추천 상태 업데이트
      await updateRecommend(menu_id, false);
    }
  }
};







  useEffect(() => {
    //console.log(selectedStoreIndex);
    // selectedStoreIndex가 null이 아닌 경우에만 접근
    if (selectedStoreIndex !== null) {
      //console.log("추천 카운트 확인: ", menuStates);
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
    centerPadding: "28px", //옆에 메뉴 살짝 미리보기 할 수 있게
    swipeToSlide: true,
    touchThreshold: 10,
    draggable: true,
    afterChange: (current: number) => {
      setCurrentSlideIndex(current);
    },
  };

  const handleStoreClick = (menuId: number) => {
    const selectedMenuSet = menus.find((menu) => menu.id === menuId);
    if (selectedMenuSet) {
      navigate(
        `/main-detail/${selectedMenuSet.restaurant}/${selectedMenuSet.date}`,
        { state: { selectedMenuSet, menuStates } }
      );
    } else {
      console.error("Invalid menu ID:", menuId);
    }
  };

  return (
    <div
      style={{ textAlign: "center", width: "100%", backgroundColor: "white" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "8px",
        }}
      >
        <img
          src={LogoImage}
          style={{
            width: "88px",
            height: "auto",
            marginBottom: "12px",
            marginTop: "12px",
          }}
        />
      </div>
      {/*날짜, 식사 표시*/}
      <div
        style={{
          textAlign: "left",
          fontWeight: "bold",
          marginBottom: "12px",
          marginLeft: "8px",
        }}
      >
        {`${currentDate} 식단 - `}
        <span
          style={{
            color:
              mealTime === "조식"
                ? "#94C120"
                : mealTime === "중식"
                ? "#F08A01"
                : mealTime === "석식"
                ? "#888C8D"
                : "black", //기본색 (값이 없을때)
          }}
        >
          {mealTime}
        </span>
      </div>

      <div
        className="slider-container"
        style={{
          height: "500px",
          margin: "0 auto",
          alignItems: "left",
          padding: "0px",
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {menus.length === 0 ? (
            // 메뉴가 없을 때 처리
            <div
              className="slide"
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                minWidth: "320px",
                margin: "4px",
              }}
            >
              <div
                style={{
                  width: "300px",
                  height: "482px",
                  margin: "10px",
                  marginBottom: "20px",
                  boxShadow: "0 0px 20px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={NoImage}
                  className="menu-image"
                  style={{
                    width: "328px",
                    height: "auto",
                    alignItems: "center",
                  }}
                />
                <div
                  style={{ margin: "12px", fontSize: "16px", color: "#888", display : 'flex', justifyContent : 'center', justifyItems:'center' }}
                >
                  • 오늘의 메뉴가 없습니다
                </div>
              </div>
            </div>
          ) : (
            // 메뉴가 있을 때 기존 처리
            menus.map((menu, index) => (
              <div
                key={menu.id}
                className="slide"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  minWidth: "320px",
                  margin: "4px",
                }}
              >
                <div
                  style={{
                    width: "300px",
                    height: "482px",
                    margin: "10px",
                    marginBottom: "20px",
                    boxShadow: "0 0px 20px rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                  }}
                  onClick={() => handleStoreClick(menu.id)}
                >
                  <img
                    src={menu.id?.photo ? `https://hymeal.site/${menu.photo}` : NoImage}
                    className="menu-image"
                    style={{
                      width: "328px",
                      height: "auto",
                      alignItems: "center",
                      borderTopLeftRadius :'12px' ,
                      borderTopRightRadius :'12px'
                    }}
                    
                  />
                  
                  <div style={{ margin: "12px" }}>
                    <ul
                      style={{
                        width: "280px",
                        height: "72px",
                        marginBottom: "8px",
                      }}
                    >
                      {menu.foods.map(
                        (
                          food: { name: string; average_rating: number },
                          foodIndex: number
                        ) => (
                          <li
                            key={foodIndex}
                            style={{
                              display: "flex",
                              height: "24px",
                              width: "270px",
                              justifyContent: "space-between",
                              alignItems: "center",
                              
                            }}
                          >
                            <div style={{fontSize : '16px'}}>
                              • {food.name} {/* 음식 이름 */}
                            </div>
                            <div
                              style={{
                                textAlign: "right",
                                alignItems: "center",
                                display: "flex",
                                justifyItems: "center",
                              }}
                            >
                              <img
                                src={Star}
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  marginRight: "5px",
                                }}
                              />
                          {(food.average_rating / 2).toFixed(1)}{" "}                              
                          {/* 평점 표시 */}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div
                    className="buttons"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      key={menu.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#444444",
                          marginBottom: "12px",
                          marginRight: "20px",
                        }}
                      >
                        추천 {menuStates[index]?.recommendCount}
                        <div
                          className="like-button"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "120px",
                            height: "104px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight:
                              menuStates[index]?.recommendationStatus ===
                              "recommended"
                                ? "bold"
                                : "normal",
                            color:
                              menuStates[index]?.recommendationStatus ===
                              "recommended"
                                ? "#134B84"
                                : "#6A6A6A",
                            border:
                              menuStates[index]?.recommendationStatus ===
                              "recommended"
                                ? "2px solid #134B84"
                                : "1px solid #F0F0F0",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "9px",
                          }}
                          onClick={(event) => {
                            event.stopPropagation(); // 클릭 이벤트 전파 방지
                            handleRecommendClick(index, menu.id);
                          }}
                        >
                          <img
                        src={
                          menuStates[index]?.recommendationStatus ===
                          "recommended" ?   RecommendClick // 추천 상태일 때의 이미지
                          : Recommend // 추천되지 않은 상태일 때의 이미지
                      }
                          style={{
                              width: "48px",
                              height: "auto",
                              padding: "6px",
                            }}
                            alt="추천"
                          />
                          추천
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "12px",
                          color: "#444444",
                          marginBottom: "12px",
                        }}
                      >
                        비추천 {menuStates[index]?.notRecommendCount}
                        <div
                          style={{
                            width: "120px",
                            height: "104px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight:
                              menuStates[index]?.notRecommendationStatus ===
                              "notRecommended"
                                ? "bold"
                                : "normal",
                            color:
                              menuStates[index]?.notRecommendationStatus ===
                              "notRecommended"
                                ? "#134B84"
                                : "#6A6A6A",
                            border:
                              menuStates[index]?.notRecommendationStatus ===
                              "notRecommended"
                                ? "2px solid #134B84"
                                : "1px solid #F0F0F0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={(event) => {
                            event.stopPropagation(); // 클릭 이벤트 전파 방지
                            handleNotRecommendClick(index, menu.id);
                          }}
                        >
                          <img
                        src={
                          menuStates[index]?.notRecommendationStatus ===
                              "notRecommended"
                                ? NoRecommendClicked // 추천 상태일 때의 이미지
                          : NoRecommend // 추천되지 않은 상태일 때의 이미지
                      }
                          style={{
                              width: "48px",
                              height: "auto",
                              padding: "6px",
                            }}
                            alt="비추천"
                          />
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 8px",
          marginTop: "14px",
        }}
      >
        {restaurants.map((restaurant, index) => (
          <button
            key={restaurant.id}
            onClick={() => fetchMenus(restaurant.name, index)}
            style={{
              width: "160px",
              height: "40px",
              borderRadius: "4px",
              backgroundColor: "#ffffff",
              fontSize: "14px",
              fontWeight: selectedStoreIndex === index ? "900" : "500",
              color: selectedStoreIndex === index ? "#134B84" : "#6A6A6A",
              border:
                selectedStoreIndex === index
                  ? "2px solid #134B84"
                  : "1px solid #6A6A6A",
              cursor: "pointer",
            }}
          >
            {restaurant.name}
          </button>
        ))}
      </div>
    </div>
  );
};