import { useState } from 'react';

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0); // 별점 상태
  const [hoveredRating, setHoveredRating] = useState(0); // 호버된 별점 상태

  const handleClick = (index: number) => {
    setRating(index);
    onRatingChange(index); // 부모 컴포넌트에 별점 전달
  };

  const handleMouseEnter = (index: number) => setHoveredRating(index);
  const handleMouseLeave = () => setHoveredRating(0);

  const getStarStyle = (index: number) => {
    if (hoveredRating >= index) {
      return { color: '#F0F900' }; // 호버된 별
    }
    if (rating >= index) {
      return { color: '#F0F900' }; // 선택된 별
    }
    return { color: '#9E9E9E' }; // 기본 색상
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer', fontSize: '24px', ...getStarStyle(index), marginRight: '8px' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
