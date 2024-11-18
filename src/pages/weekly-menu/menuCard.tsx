import noImage from "../../assets/weekly/noImage.jpg"; // noimage 파일 경로 설정

interface MenuCardProps {
  imageSrc: string; // 이미지 경로
  menuItems?: { name: string; average_rating: number }[]; // 메뉴 이름과 각 점수 (optional)
}

function MenuCard({ imageSrc, menuItems }: MenuCardProps) {
  const hasMenuItems = menuItems && menuItems.length > 0;
  const hasImage = imageSrc !== noImage;
  

  const rating = hasMenuItems
    ? menuItems.reduce((sum, item) => sum + item.average_rating, 0) /
      menuItems.length
    : 0;
  console.log(imageSrc)

  return (
    <div className="h-[150px] flex bg-white border-[1px] border-solid border-[#F0F0F0] rounded-lg mb-[8px] items-center">
      <div className="relative w-[148px] h-full flex justify-center items-center">
        <img
          src={hasMenuItems  && hasImage ? `http://44.223.183.118${imageSrc}` : noImage}
          alt="Menu"
          className="w-full h-full object-cover rounded-l-lg"
        />
        {hasMenuItems && hasImage ? (
          <div className="absolute flex items-center text-[24px] font-bold gap-[12px] border-[1px] border-[#F0F0F0]">
            <div className="text-[#F0F900] text-[50px] ">★ </div>
            <div className="text-white">{rating.toFixed(1)}</div>
          </div>
        ) : null}
      </div>

      {/* 메뉴 정보 */}
      <div className="w-[200px] justify-center items-center">
        {hasMenuItems ? (
          // 메뉴 항목 리스트
          <div className="list-disc p-[12px] text-[12px] justify-center items-center">
            {menuItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center ">
                <span className="">{item.name}</span>
                <div className="flex justify-center items-center gap-[4px]">
                  <span className="text-[#F0F900] text-[30px] ">★</span>
                  <span className="ml-[2px]">{item.average_rating}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-[12px] text-[12px] text-center text-black">
            오늘의 메뉴가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuCard;
