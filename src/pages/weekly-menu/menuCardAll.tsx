interface MenuCardProps {
  restaurant: string; // 식당 이름
  menuItems: { name: string; average_rating:number; }[]; // 메뉴 이름과 각 점수
}

function MenuCardAll({ restaurant, menuItems }: MenuCardProps) {

  const rating = menuItems.reduce((sum, item) => sum + item.average_rating, 0) /menuItems.length
   
  
  return (
    <div className=" bg-white border-[1px] border-[#F0F0F0] border-solid px-[12px] py-[10px] rounded-lg mb-[8px] font-medium">
      {/* 식당 이름 */}
      <div className="text-[14px] mb-[6px]">{restaurant}</div>

      <div className="flex items-center justify-between">
        {/* 메뉴 항목 리스트 */}
        <div className="text-[12px] flex flex-wrap gap-[4px]">
          {menuItems.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>

        {/* 전체 별점 */}
        <div className="flex justify-end items-center">
          <span className="text-[#F0F900] text-[20px]">★</span>
          <span className="ml-[4px] text-[14px] font-bold">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default MenuCardAll;
