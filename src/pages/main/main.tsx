import React, { useState, useEffect } from 'react';
import LogoImage from "@assets/main/logo.webp";
import Slider from "react-slick";
import { stores, Store } from '@pages/main/main-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export const MainPage: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState<string>('아침');
  const [isLoggedIn] = useState<boolean>(false); //로그인 기능
  const [currentStoreIndex, setCurrentStoreIndex] = useState<number>(0);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); 

  const settings = {
    //dots: true,
    //infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true, 
    touchThreshold: 10,
    draggable: true, 
    afterChange: (current: number) => setCurrentSlideIndex(current),
  };

  useEffect(() => {
    setCurrentStore(stores[currentStoreIndex]);
  }, [currentStoreIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentMeal === '아침') setCurrentMeal('점심');
      else if (currentMeal === '점심') setCurrentMeal('석식');
      else if (currentMeal === '석식') setCurrentMeal('아침');
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [currentMeal]);

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다. 로그인 화면으로 이동합니다.');
    }
  };

  const handleRecommendClick = () => {
    setIsRecommended(true);
  };

  const handleChangeStore = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentStoreIndex((prevIndex) => (prevIndex + 1) % stores.length);
    } else {
      setCurrentStoreIndex((prevIndex) => (prevIndex - 1 + stores.length) % stores.length);
    }
    setIsRecommended(false); // 식당을 변경하면 추천 상태 초기화
  };

  return (
    <div style={{textAlign : 'center', width: '100%'}}>
      <div style={{display:'flex', top:'0',  justifyContent:'center', marginBottom:'12px', marginTop:'30px', position: 'sticky'}}>
        <img src={LogoImage} style={{ width: '85px', height: 'auto', marginBottom : '10px'}}/>
      </div>

      <div style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '10px', marginLeft:'8px'}}>
        {`${stores[currentSlideIndex].date} - ${stores[currentSlideIndex].title}`}
      </div>

      <div className="slider-container" style={{width : '100%', height:'800px', margin:'0 auto', alignItems:'left'}}>
        <Slider {...settings}>
          {stores.map((food) => (
            <div key={food.id} className="slide" style ={{ display: 'flex', flexDirection: 'column', marginLeft:'5px'}}>
              <div style={{width: '328px', height: '482px', margin: '0 auto', marginBottom:'20px',boxShadow : '0 6px 10px rgba(0,0,0,0.3)', borderRadius:'12px'}}>
                <img src={food.imageUrl} className="menu-image" style={{width:'328px', height:'auto',alignItems: 'center'}} />
                {/* <ul>
                  {food.mainMenu.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul> */}
                <div className="buttons" style={{display: 'flex', alignItems:'center', justifyContent:'center', gap:'24px'}}>
                  <div className="like-button" style={{width:'124px', height:'104px', borderRadius:'10px', boxShadow:'0 0 5px rgba(0,0,0,0.3)'}}>추천</div>
                  <div className="dislike-button" style={{width:'124px', height:'104px', borderRadius:'10px',boxShadow:'0 0 5px rgba(0,0,0,0.3)'}}>비추천</div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>

    
    </div>
  );
};

