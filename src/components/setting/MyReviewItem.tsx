import ratingIcon from "@assets/setting/rating-star.svg";
import { MyReview } from "@type/my-review";

export const MyReviewItem = ({ id, name, ratings }: MyReview) => {
  const ratingAvg = Math.floor(
    ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
  );
  return (
    <li className="w-[344px] h-auto py-[10px] px-[12px] mt-[8px] border-[1px] border-solid border-[#f0f0f0] rounded-[8px] ">
      <div className="flex justify-between items-center w-[320px] h-[21px] mb-[6px]">
        <h3 className="text-[14px] font-medium text-[#1D1D1D]">학생식당</h3>
        <span className="text-[12px] font-medium text-[#6A6A6A]">24.10.01</span>
      </div>
      <ul>
        <li className="flex justify-between items-center w-[320px] h-[20px] list-disc">
          <h4 className="text-[12px] font-medium text-[#444444]">· {name}</h4>
          <div className="flex">
            <img src={ratingIcon} className="mr-[4px]" alt="rating-star-icon" />
            <span className="text-[12px] font-bold text-[#1D1D1D]">
              {ratingAvg}
            </span>
          </div>
        </li>
      </ul>
    </li>
  );
};
