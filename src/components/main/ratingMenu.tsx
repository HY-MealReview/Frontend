interface RatingMenusProps {
    restaurant: string; // 식당 이름
    menuItems: { name: string; average_rating: number }[]; // 메뉴 이름과 평점
  }
  
  function RatingMenus({ menuItems }: RatingMenusProps) {
  
    return (
    <div>

      <ul>        
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.average_rating}
          </li>
        ))}
      </ul>
    </div>
    );
  }

  export default RatingMenus;