import rightArrowBtn from "@assets/setting/right-arrow.svg";
import { Link } from "react-router-dom";
import logo from "@assets/common/logo.svg";

export const SettingPage = () => {
  return (
    <div className="flex flex-col items-center w-full ">
      <header className="w-full h-[50px] flex items-center justify-center relative">
        <img src={logo} alt="logo" />
      </header>

      {/* <section className="w-[344px] h-[54px] mb-[12px]">
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
        <button className="flex justify-between items-center w-[344px] text-[14px] text-[#1D1D1D] mb-[12px]">
          <span>공지사항</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
        <button className="flex justify-between items-center w-[344px] text-[14px] text-[#1D1D1D] mb-[12px]">
          <span>고객센터</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
        <button className="flex justify-between items-center w-[344px] text-[14px] font-medium text-[#FF0000]">
          <span>로그아웃</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
      </section> */}

      <section className="w-[344px] h-[208px] mb-[12px]">
        <h2 className="text-[10px] font-medium text-[#9E9E9E] mb-[8px]">
          내 정보
        </h2>
        <div className="w-[344px] h-[32px] flex justify-between items-center">
          <span className="text-[12px] font-medium text-[#1D1D1D]">
            닉네임123
          </span>
          <button className="text-[12px] font-medium text-[#134B84]">
            수정
          </button>
        </div>
        <div className="w-[344px] h-[32px] flex justify-between items-center mb-[12px]">
          <span className="text-[12px] font-medium text-[#1D1D1D]">
            비밀번호 변경
          </span>
          <button className="text-[12px] font-medium text-[#134B84]">
            변경
          </button>
        </div>

        <button className="w-[344px] h-[106px] flex flex-col justify-center items-center border-[1px] border-solid border-[#F0F0F0] rounded-[6px] shadow-custom-shadow">
          <h3 className="w-full h-[22px] mb-[8px] text-center text-[16px] font-medium text-[#1D1D1D]">
            리뷰메뉴
          </h3>
          <strong className="w-full h-[33px] text-center text-[24px] font-bold text-[#1D1D1D]">
            10
          </strong>
        </button>
      </section>

      <hr className="w-full h-[1px] border-[#F0F0F0] mb-[12px]" />

      <section className="flex flex-col w-[344px] h-[142px] ">
        <h2 className="text-[10px] text-[#9E9E9E] mb-[8px]">지원</h2>
        <button className="flex justify-between items-center w-[344px] text-[14px] text-[#1D1D1D] mb-[12px]">
          <span>공지사항</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
        <button className="flex justify-between items-center w-[344px] text-[14px] text-[#1D1D1D] mb-[12px]">
          <span>고객센터</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
        <button className="flex justify-between items-center w-[344px] text-[14px] font-medium text-[#FF0000]">
          <span>로그아웃</span>
          <img src={rightArrowBtn} alt="right-arrow-button" />
        </button>
      </section>
    </div>
  );
};
