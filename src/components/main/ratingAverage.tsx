interface RatingAverageProps {
    restaurant: string; // 식당 이름
    menuItems: { name: string; average_rating: number }[]; // 메뉴 이름과 평점
  }
  
  function RatingAverageAll({ menuItems }: RatingAverageProps) {
    const rating =
      menuItems.length > 0
        ? menuItems.reduce((sum, item) => sum + item.average_rating, 0) / menuItems.length
        : 0;
  
    return (
      <div>
        <p>평균 평점: {rating.toFixed(1)}</p>
      </div>
    );
  }
  export default RatingAverageAll;