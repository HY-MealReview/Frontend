import classNames from "classnames";
import { SetStateAction } from "react";

export const FilteredRestaurant = ({
  setIsClickedFilter,
  selectedFilter,
  setSelectedFilter,
  filterRef,
}: {
  setIsClickedFilter: React.Dispatch<SetStateAction<boolean>>;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<SetStateAction<string>>;
  filterRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={filterRef}
      className="fixed bottom-[72px] w-full min-w-[360px] max-w-[400px] h-[210px] pt-[16px] rounded-tl-[20px] rounded-tr-[20px] bg-white animate-fadeIn"
    >
      <h2 className=" mb-[12px] ml-[16px] text-[16px] font-bold text-[#000000]">
        표시항목
      </h2>
      <div className="flex justify-center w-full mb-[12px]">
        <ul className="flex flex-wrap justify-start gap-[8px] w-[343px] h-[88px]">
          <li
            className={classNames(
              "flex justify-center items-center w-[109px] h-[40px] border-[1px] border-solid  rounded-[4px] text-[12px] ",
              {
                "border-[#134B84] text-[#134B84] font-bold":
                  selectedFilter === "전체",
                " border-[#444444] font-normal text-[#444444]":
                  selectedFilter !== "전체",
              }
            )}
            onClick={() => setSelectedFilter("전체")}
          >
            전체
          </li>
          <li
            className={classNames(
              "flex justify-center items-center w-[109px] h-[40px] border-[1px] border-solid  rounded-[4px] text-[12px] ",
              {
                "border-[#134B84] text-[#134B84] font-bold":
                  selectedFilter === "학생식당",
                " border-[#444444] font-normal text-[#444444]":
                  selectedFilter !== "학생식당",
              }
            )}
            onClick={() => setSelectedFilter("학생식당")}
          >
            학생식당
          </li>
          <li
            className={classNames(
              "flex justify-center items-center w-[109px] h-[40px] border-[1px] border-solid  rounded-[4px] text-[12px] ",
              {
                "border-[#134B84] text-[#134B84] font-bold":
                  selectedFilter === "창업보육센터",
                " border-[#444444] font-normal text-[#444444]":
                  selectedFilter !== "창업보육센터",
              }
            )}
            onClick={() => setSelectedFilter("창업보육센터")}
          >
            창업보육센터
          </li>
          <li
            className={classNames(
              "flex justify-center items-center w-[109px] h-[40px] border-[1px] border-solid  rounded-[4px] text-[12px] ",
              {
                "border-[#134B84] text-[#134B84] font-bold":
                  selectedFilter === "창의인재원식당",
                " border-[#444444] font-normal text-[#444444]":
                  selectedFilter !== "창의인재원식당",
              }
            )}
            onClick={() => setSelectedFilter("창의인재원식당")}
          >
            창의인재원식당
          </li>
          <li
            className={classNames(
              "flex justify-center items-center w-[109px] h-[40px] border-[1px] border-solid  rounded-[4px] text-[12px] ",
              {
                "border-[#134B84] text-[#134B84] font-bold":
                  selectedFilter === "교직원식당",
                " border-[#444444] font-normal text-[#444444]":
                  selectedFilter !== "교직원식당",
              }
            )}
            onClick={() => setSelectedFilter("교직원식당")}
          >
            교직원식당
          </li>
        </ul>
      </div>
      <button
        className="flex justify-center items-center w-[344px] h-[48px] rounded-[4px] my-0 mx-auto bg-[#134B84] text-[14px] font-bold text-white"
        onClick={() => setIsClickedFilter(false)}
      >
        적용
      </button>
    </div>
  );
};
