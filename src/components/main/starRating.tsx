import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0); // 현재 별점
  const [hoveredRating, setHoveredRating] = useState(0); // 마우스 호버

  // 별 클릭
  const handleClick = (index : number) => {
    setRating(index);
  };

  // 별 호버 
  const handleMouseEnter = (index : number) => {
    setHoveredRating(index);
  };

  // 별 마우스 아웃
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  // 별 스타일
  const getStarStyle = (index : number) => {
    if (hoveredRating >= index) {
      return { color: '#F0F900' }; // 호버 시 노란색
    }
    if (rating >= index) {
      return { color: '#F0F900' }; // 선택된 별점 노란색
    }
    return { color: '#9E9E9E' }; // 기본
  };

  return (
    <div style={{margin :'0'}}>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer', fontSize: '52px', ...getStarStyle(index), margin :'0', marginRight :'12px'}}
        >
          ★
        </span>
      ))}

    </div>
  );
};

export default StarRating;
