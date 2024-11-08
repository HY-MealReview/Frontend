import { useState, useEffect, useRef } from 'react';
import LogoImage from "@assets/main/logo.webp";
import Recommend from "@assets/main/Recommend.webp";
import star from "@assets/main/star.webp";
import Slider from "react-slick";
import { menus,Rating } from '@pages/main/main-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";



export const MainPage = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [mealTime, setMealTime] = useState<string>('');
  const [recommendationStatus, setRecommendationStatus] = useState<(string | null)[]>(menus.map(() => null));
  const [notRecommendationStatus, setNotRecommendationStatus] = useState<(string | null)[]>(menus.map(() => null));
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); 
  const [selectedStoreIndex, setSelectedStoreIndex] = useState<number>(0);  
  const [currentRestaurant, setCurrentRestaurant] = useState(menus[0].restaurant);
  const [recommendCount, setRecommendCount] = useState(0); //추천수 카운팅
  const [NotRecommendCount, setNotRecommendCount] = useState(0); //추천수 카운팅


  const sliderRef = useRef<Slider | null>(null); 
  const navigate = useNavigate(); //페이지 이동하기


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, 
    centerPadding: '30px', //옆에 메뉴 살짝 미리보기 할 수 있게
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

  useEffect(() => {
    console.log(`현재 슬라이드 인덱스: ${currentSlideIndex + 1}`); //현재 인덱스 번호 출력
  }, [currentSlideIndex]);




const handleRecommendClick = (index: number) => {
    setRecommendationStatus(prev => {
        const newStatus = [...prev];
        newStatus[index] = newStatus[index] === 'recommended' ? null : 'recommended';
        // 비추천 상태를 해제
        const newNotStatus = [...notRecommendationStatus];
        newNotStatus[index] = null;
        setNotRecommendationStatus(newNotStatus);
        
        const recommendCountChange = newStatus[index] === 'recommended' ? 1 : -1;
        const newCount = Math.max(recommendCount + recommendCountChange, 0);
        setRecommendCount(newCount);
        
        return newStatus;
    });
};

const handleNotRecommendClick = (index: number) => {
    setNotRecommendationStatus(prev => {
        const newStatus = [...prev];
        newStatus[index] = newStatus[index] === 'NotRecommended' ? null : 'NotRecommended';
        // 추천 상태를 해제
        const newRecStatus = [...recommendationStatus];
        newRecStatus[index] = null;
        setRecommendationStatus(newRecStatus);
        
        const NotRecommendCountChange = newStatus[index] === 'NotRecommended' ? 1 : -1;
        const newCount = Math.max(NotRecommendCount + NotRecommendCountChange, 0);
        setNotRecommendCount(newCount);
        
        return newStatus;
    });
};
//버튼, 슬라이드에 따라 메뉴 바꾸기 - ref 추가
const handleStoreButtonClick = (restaurant: string, index: number) => {
  setCurrentRestaurant(restaurant); // 선택된 식당 이름 업데이트
  setSelectedStoreIndex(index); // 선택된 버튼 인덱스 업데이트
  if (sliderRef.current) {
    sliderRef.current.slickGoTo(0); // 슬라이드 이동
  }
};


const handleStoreClick = (id : number) => {
  navigate(`/main-detail/${id}`);
  };

  const calculateAverageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) return 0;
    const totalScore = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return (totalScore / ratings.length /2).toFixed(1); // 10점으로 계산 후 나누기 2로 나타내기, 소수점 1자리까지
  };
  


  return (
    <div style={{textAlign : 'center', width: '100%', backgroundColor : 'white'}}>
      <div style={{display:'flex', top:'0',  justifyContent:'center', marginBottom:'8px'}}>
        <img src={LogoImage} style={{ width: '88px', height: 'auto', marginBottom : '12px', marginTop:'12px'}}/>
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


      <div className="slider-container" style={{ height:'500px', margin:'0 auto', alignItems:'left', padding :'0px'}}>
        <Slider ref={sliderRef} {...settings}>
        {menus
            .filter(menu => menu.restaurant === currentRestaurant).map((menu, setIndex) => (
            <div key={setIndex} className="slide" style ={{ display: 'flex',flexDirection: 'column', flexWrap: 'wrap', minWidth: '320px', margin :'4px'}}>
              <div style={{width: '328px', height: '482px', margin: '10px', marginBottom:'20px',boxShadow : '0 0px 20px rgba(0,0,0,0.1)', borderRadius:'12px'}}
              onClick={() => handleStoreClick(menu.id)}>
                <img src={menu.imageUrl} className="menu-image" style={{width:'328px', height:'auto',alignItems: 'center'}} />
                <div style={{margin : '12px'}}>
                  <ul style={{width : '304px', height : '72px', marginBottom :'8px'}}>
                  {menu.foods.map((item, index)  => (
                      <li key={index} style={{ display: 'flex', height : '24px',width :'300px',justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                        • {item.name}
                        </div>
                        <div style={{textAlign:'right', alignItems:'center', display : 'flex', justifyItems : 'center'}}>
                          <img src={star} style={{width:'20px', height:'20px', margin : '5px'}}/> 
                          {calculateAverageRating(item.ratings)}
                        </div>
                      </li>
                    ))}
                    
                  </ul>
                  <div className="buttons" style={{display: 'flex', alignItems:'center', justifyContent:'center', gap:'24px'}}>
                    <div>
                      <div style={{fontSize : '12px', color : '#444444', marginBottom : '12px'}}>
                        추천 {recommendCount}
                        </div>
                      <div 
                      className="like-button" 
                      style={{width:'124px', height:'104px', borderRadius:'10px', cursor: 'pointer',
                        fontSize : '14px', fontWeight : recommendationStatus[setIndex] ? 'bold' : 'normal',
                        color : recommendationStatus[setIndex] ? '#134B84' : '#6A6A6A' ,
                        border: recommendationStatus[setIndex] ? '2px solid #134B84' : '1px solid #F0F0F0',
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'center',
                        gap : '9px',
                            }}
                            onClick={(event) => {
                              event.stopPropagation(); // 클릭 이벤트 전파 방지
                              handleRecommendClick(setIndex);
                            }}>
                        <img src={Recommend} style={{width : '48px', height : 'auto', padding : '6px'}}/>
                        추천
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize : '12px', color : '#444444', marginBottom : '12px'}}>
                        비추천 {NotRecommendCount}
                        </div>
                      <div 
                      style={{width:'124px', height:'104px', borderRadius:'10px', cursor: 'pointer',
                        fontSize : '14px', fontWeight : notRecommendationStatus[setIndex]? 'bold' : 'normal',
                        color : notRecommendationStatus[setIndex] ? '#134B84' : '#6A6A6A' ,
                              border: notRecommendationStatus[setIndex] ? '2px solid #134B84' : '1px solid #F0F0F0',
                              display : 'flex',
                              alignItems : 'center',
                              justifyContent : 'center',}}
                              onClick={(event) => {
                                event.stopPropagation(); // 클릭 이벤트 전파 방지
                                handleNotRecommendClick(setIndex);
                              }}>
                        비추천</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>

    {/* 식당 선택 버튼 섹션 */}
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 8px', marginTop: '14px'}}>
      {Array.from(new Set(menus.map(menu => menu.restaurant))).map((restaurant, index) => (
          <button         
            key={index}
            onClick={() => handleStoreButtonClick(restaurant, index)}
            style={{
              width : '160px',
              height : '40px',
              borderRadius: '4px',
              backgroundColor: '#ffffff',
              fontSize : '14px',
              fontWeight : selectedStoreIndex === index ? '900' : '500',
              color: selectedStoreIndex === index ? '#134B84':'#6A6A6A',
              border: selectedStoreIndex === index ? '2px solid #134B84': '1px solid #6A6A6A',
              cursor: 'pointer',
            }}
          >
            {restaurant}
          </button>
        ))}
      </div>

    
    </div>
  );
};

