import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getMenusByRestaurantAndDate } from '@apis/mainApi';

export const MainDetailPage = () => {
  const { restaurant, date } = useParams<{ restaurant: string; date: string }>();
  const [menuData, setMenuData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // 모든 메뉴 데이터를 가져옵니다.
        const menus = await getMenusByRestaurantAndDate(restaurant, date);
        
        // 현재 식당과 날짜에 맞는 메뉴만 필터링합니다.
        const filteredMenus = menus.filter(menu => menu.restaurant === restaurant && menu.date === date);
        setMenuData(filteredMenus);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenus();
  }, [restaurant, date]);


 return (
    <div>
      <h1>{restaurant} 메뉴</h1>
      <ul>
        {menuData.map(menu => (
          <li key={menu.id}>
            <h2>{menu.time}</h2>
            <ul>
              {menu.foods.map((food : string, index : number) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
