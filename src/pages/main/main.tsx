import React, { useState, useEffect } from 'react';
import LogoImage from "@assets/main/logo.webp";
import Slider from "react-slick";
import { stores, Store } from '@pages/main/main-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export const MainPage: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState<string>('아침');
  const [currentStoreIndex, setCurrentStoreIndex] = useState<number>(0);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [isRecommended, setIsRecommended] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0); 
  const [selectedStoreIndex, setSelectedStoreIndex] = useState<number | null>(null); 
  

  const settings = {
    //dots: true,
    //infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true, 
    touchThreshold: 10,
    draggable: true, 
    afterChange: (current: number) => {
      setCurrentSlideIndex(current); 
      setSelectedStoreIndex(current); 
    },
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


  const handleRecommendClick = () => {
    setIsRecommended(!isRecommended); 
};


//버튼, 슬라이드에 따라 메뉴 바꾸기
  const handleStoreButtonClick = (index: number) => {
    setCurrentStoreIndex(index); // 선택된 식당 메뉴 업뎃
    setSelectedStoreIndex(index); // 버튼 강조하기
    setCurrentSlideIndex(index); // 슬라이드 이동하기
  };

  return (
    <div style={{textAlign : 'center', width: '100%'}}>
      <div style={{display:'flex', top:'0',  justifyContent:'center', marginBottom:'8px', marginTop:'32px', position: 'sticky'}}>
        <img src={LogoImage} style={{ width: '88px', height: 'auto', marginBottom : '12px', marginTop:'12px'}}/>
      </div>

      <div style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '12px', marginLeft:'8px'}}>
        {`${stores[currentSlideIndex].date} - ${stores[currentSlideIndex].title}`}
      </div>


      <div className="slider-container" style={{width : '100%', height:'500px', margin:'0 auto', alignItems:'left'}}>
        <Slider {...settings}>
          {stores.map((food) => (
            <div key={food.id} className="slide" style ={{ display: 'flex', flexDirection: 'column', marginLeft:'5px'}}>
              <div style={{width: '328px', height: '482px', margin: '0 auto', marginBottom:'20px',boxShadow : '0 0px 20px rgba(0,0,0,0.1)', borderRadius:'12px'}}>
                <img src={food.imageUrl} className="menu-image" style={{width:'328px', height:'auto',alignItems: 'center'}} />
                <div style={{margin : '12px'}}>
                  <ul style={{width : '304px', height : '72px', marginBottom :'8px'}}>
                    {food.mainMenu.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                  <div className="buttons" style={{display: 'flex', alignItems:'center', justifyContent:'center', gap:'24px'}}>
                    <div>
                      <div style={{fontSize : '12px', color : '#444444', marginBottom : '12px'}}>추천</div>
                      <div 
                      className="like-button" 
                      style={{width:'124px', height:'104px', borderRadius:'10px', cursor: 'pointer',
                        fontSize : '14px', fontWeight : isRecommended ? 'bold' : 'normal',
                        color : isRecommended ? '#134B84' : '#6A6A6A' ,
                              border: isRecommended ? '2px solid #134B84' : '1px solid #F0F0F0',
                            }}
                      onClick={handleRecommendClick}>
                        추천
                      </div>
                    </div>
                    <div>
                      <div 
                      style={{width:'124px', height:'104px', borderRadius:'10px', cursor: 'pointer',
                        fontSize : '14px', fontWeight : isRecommended ? 'bold' : 'normal',
                        color : isRecommended ? '#134B84' : '#6A6A6A' ,
                              border: isRecommended ? '2px solid #134B84' : '1px solid #F0F0F0',}}
                      onClick={handleRecommendClick}>
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
        {stores.map((store, index) => (
          <button
            key={store.id}
            onClick={() => handleStoreButtonClick(index)}
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
            {store.name}
          </button>
        ))}
      </div>

    
    </div>
  );
};

