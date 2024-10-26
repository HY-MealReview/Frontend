import rightArrowBtn from "@assets/setting/right-arrow.svg";
import { Link } from "react-router-dom";

export const SettingPage = () => {
  return (
    <div className="flex flex-col items-center w-full ">
      <header className="w-full h-[48px] flex items-center relative mb-[8px]">
        <h1 className="my-0 mx-auto">설정</h1>
      </header>

      <section className="w-[344px] h-[54px] mb-[12px]">
        <h2 className="text-[10px] font-medium text-[#9E9E9E] mb-[8px]">
          내 정보
        </h2>
        <Link
          to={"/login"}
          className="flex items-center justify-center w-[344px] h-[32px] bg-main text-white rounded-[4px] text-[12px] font-bold"
        >
          로그인을 해주세요
        </Link>
      </section>

      <hr className="w-full h-[1px] border-[#F0F0F0] mb-[12px]" />

      <section className="flex flex-col w-[344px] h-[142px] ">
        <h2 className="text-[10px] text-[#9E9E9E] mb-[8px]">지원</h2>
        <button className="flex justify-between items-center w-[328px] text-[14px] text-[#1D1D1D] mb-[12px]">
          <span>공지사항</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
        <button className="flex justify-between items-center w-[328px] text-[14px] text-[#1D1D1D] mb-[12px]">
          <span>고객센터</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
        <button className="flex justify-between items-center w-[328px] text-[14px] font-medium text-[#FF0000]">
          <span>로그아웃</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
      </section>
    </div>
  );
};
