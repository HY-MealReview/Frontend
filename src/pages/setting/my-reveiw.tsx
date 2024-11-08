import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import prevArrow from "@assets/common/prev-arrow.svg";
import infoIcon from "@assets/setting/info.svg";
import filterUnactive from "@assets/setting/filter-unactive.svg";
import filterActive from "@assets/setting/filter-active.svg";
import { getUserReviews } from "@apis/my-review";
import { MyReview } from "@type/my-review";
import { MyReviewItem } from "@components/setting/MyReviewItem";

export const MyReviewPage = () => {
  const [reviewData, setReviewData] = useState<MyReview[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchUserReview = async () => {
    const response = await getUserReviews();
    setReviewData(response?.data);
    console.log(response?.data);
    if (reviewData) console.log(response?.data);
  };

  useEffect(() => {
    fetchUserReview();
  }, []);

  return (
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
          onClick={() => navigate(-1)}
        />
      </header>

      <div className="flex justify-between w-[344px] h-[32px]">
        {isFiltered ? (
          <img
            src={filterActive}
            className=""
            alt="filter-active-icon"
            onClick={() => setIsFiltered(!isFiltered)}
          />
        ) : (
          <img
            src={filterUnactive}
            className=""
            alt="filter-unactive-icon"
            onClick={() => setIsFiltered(!isFiltered)}
          />
        )}
        <span>오래된순</span>
      </div>

      <ul>
        {reviewData.map((review) => (
          <MyReviewItem key={review.id} {...review} />
        ))}
      </ul>
    </div>
  );
};
