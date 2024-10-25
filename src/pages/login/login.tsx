import { Link } from "react-router-dom";
import logo from "@assets/common/logo.svg";
import eyeOpen from "@assets/login/eye_open.svg";
import eyeClosed from "@assets/login/eye_closed.svg";
import { useState } from "react";

export const LoginPage = () => {
  const [showPw, setShowPw] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      <header className="flex justify-center items-center w-[360px] h-[50px] mb-[20px]">
        <img src={logo} alt="logo-image" />
      </header>

      <div>
        <div className="flex flex-col w-[344px] h-[81px] mb-[24px]">
          <label
            htmlFor="id"
            className="mb-[12px] text-[14px] font-bold text-[#1D1D1D]"
          >
            학번
          </label>
          <input
            type="text"
            id="id"
            className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:outline-none placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
            placeholder="학번을 입력해주세요"
          />
        </div>
        <div className="flex flex-col relative w-[344px] h-[81px] mb-[12px]">
          <label
            htmlFor="pw"
            className="mb-[12px] text-[14px] font-bold text-[#1D1D1D] "
          >
            비밀번호
          </label>
          <input
            type={showPw ? "text" : "password"}
            id="pw"
            className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:outline-none placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
            placeholder="비밀번호를 입력해주세요"
          />
          {showPw ? (
            <img
              src={eyeOpen}
              alt="eye-open"
              className="absolute top-[45px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowPw(!showPw)}
            />
          ) : (
            <img
              src={eyeClosed}
              alt="eye-closed"
              className="absolute top-[45px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowPw(!showPw)}
            />
          )}
        </div>
      </div>

      <button className="flex justify-end w-[344px] mb-[24px] text-[12px] text-[#444444] leading-[1.5]">
        비밀번호 찾기
      </button>

      <div className="flex flex-col items-center ">
        <Link
          to={"/signup"}
          className="flex justify-center items-center w-[344px] h-[48px] rounded-[4px] mb-[12px] border-[1px] border-solid border-main text-[14px] font-medium text-main"
        >
          회원가입
        </Link>
        <button className="w-[344px] h-[48px] rounded-[4px] text-[14px] text-white bg-main">
          로그인
        </button>
      </div>
    </div>
  );
};
