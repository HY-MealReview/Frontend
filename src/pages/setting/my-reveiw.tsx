import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserReviews } from "@apis/my-review";
import { MyReview } from "@type/my-review";
import { MyReviewItem } from "@components/setting/MyReviewItem";
import prevArrow from "@assets/common/prev-arrow.svg";
import infoIcon from "@assets/setting/info.svg";
import filterUnactive from "@assets/setting/filter-unactive.svg";
import filterActive from "@assets/setting/filter-active.svg";
import upArrow from "@assets/setting/up-arrow.svg";
import { FilteredRestaurant } from "@components/setting/FilteredRestaurant";

export const MyReviewPage = () => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState<MyReview[]>([]);
  const [isClickedFilter, setIsClickedFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [isClickedInfo, setIsClickedInfo] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const fetchUserReview = async () => {
    const response = await getUserReviews();
    setReviewData(response?.data);
    if (reviewData) console.log(response?.data);
  };

  useEffect(() => {
    fetchUserReview();
  }, []);

  useEffect(() => {
    // 아래의 이벤트 리스너에서 'mousedown'이벤트를 명시적으로 사용했으므로
    // 여기서의 event는 MouseEvent라는 보장이 생기는 것 -> 이 이벤트 객체에는 마우스 관련 속성들이 포함되어 있음
    const handleClickOutside = (event: MouseEvent) => {
      if (
        // 필터 메뉴 DOM이 화면에 렌더링 되어 있고
        filterRef.current &&
        // 현재 클릭된 위치가 필터 메뉴 외부일 때
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsClickedFilter(false);
      }
    };

    // mousedown(마우스 버튼이 눌린 순간) 이벤트가 발생할 때마다 함수
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  return (
    <>
      <div className="flex flex-col items-center">
        <header className="relative flex justify-center items-center w-full h-[50px] mb-[6px] bg-white">
          <img
            src={prevArrow}
            className="absolute top-1/2 -translate-y-1/2 left-[8px] w-[24px] h-[24px] cursor-pointer"
            alt="prev-arrow"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[16px] font-medium text-[#1D1D1D]">리뷰메뉴</h1>
          <img
            src={infoIcon}
            className="absolute top-1/2 -translate-y-1/2 right-[8px] w-[24px] h-[24px] cursor-pointer"
            alt="prev-arrow"
            onClick={() => {
              setIsClickedInfo(true);
              setTimeout(() => {
                setIsClickedInfo(false);
              }, 2000);
            }}
          />

          {isClickedInfo && (
            <div className=" flex justify-center items-center absolute top-[41px] right-[6px] w-[250px] h-[36px] rounded-[4px] shadow-span-shadow animate-fadeUpTodown ">
              <img
                src={upArrow}
                className="absolute top-[-12px] right-[5px]"
                alt="up-arrow"
              />
              <span className="text-[10px] font-normal text-[#1D1D1D]">
                이용자께서 작성하신 리뷰 점수가 표시됩니다.
              </span>
            </div>
          )}
        </header>

        <div className="flex justify-between w-[344px] h-[32px]">
          {isClickedFilter ? (
            <img
              src={filterActive}
              className=""
              alt="filter-active-icon"
              onClick={() => setIsClickedFilter(!isClickedFilter)}
            />
          ) : (
            <img
              src={filterUnactive}
              className=""
              alt="filter-unactive-icon"
              onClick={() => setIsClickedFilter(!isClickedFilter)}
            />
          )}
        </div>

        <ul>
          {reviewData.map((review) => (
            <MyReviewItem key={review.id} {...review} />
          ))}
        </ul>
      </div>
      {isClickedFilter && (
        <>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <FilteredRestaurant
            setIsClickedFilter={setIsClickedFilter}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filterRef={filterRef}
          />
        </>
      )}
    </>
  );
};
