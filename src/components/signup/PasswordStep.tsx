import eyeClosed from "@assets/login/eye_closed.svg";
import eyeOpen from "@assets/login/eye_open.svg";
import { ChangeEvent, useState } from "react";

export const PasswordStep = () => {
  const [inputValue, setInputValue] = useState({
    pw: "",
    pwCheck: "",
  });
  const [inputValid, setInputValid] = useState({
    pw: false,
    pwCheck: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    pwMessage: "",
    pwCheckMessage: "",
  });
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showPwCheck, setShowPwCheck] = useState<boolean>(false);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case "pw":
        break;
      case "pwCheck":
        break;
    }
  };

  return (
    <div>
      <strong className="block w-[344px] h-[30px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
        <span className="font-bold">비밀번호</span>를 입력해주세요
      </strong>

      <div className="relative flex flex-col mb-[12px]">
        <label
          htmlFor="pw"
          className="text-[14px] font-bold leading-6 mb-[12px]"
        >
          비밀번호
        </label>
        <input
          type={showPw ? "text" : "password"}
          id="pw"
          className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
          placeholder="0000000000"
        />
        {showPw ? (
          <img
            src={eyeOpen}
            alt="eye-open"
            className="absolute top-[47px] right-3 w-[24px] h-[24px]"
            onClick={() => setShowPw(!showPw)}
          />
        ) : (
          <img
            src={eyeClosed}
            alt="eye-closed"
            className="absolute top-[47px] right-3 w-[24px] h-[24px]"
            onClick={() => setShowPw(!showPw)}
          />
        )}
      </div>

      <div className="relative flex flex-col mb-[12px]">
        <label
          htmlFor="pw-check"
          className="text-[14px] font-bold leading-6 mb-[12px]"
        >
          비밀번호 확인
        </label>
        <input
          type={showPwCheck ? "text" : "password"}
          id="pw-check"
          className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
          placeholder="0000000000"
        />
        {showPwCheck ? (
          <img
            src={eyeOpen}
            alt="eye-open"
            className="absolute top-[47px] right-3 w-[24px] h-[24px]"
            onClick={() => setShowPwCheck(!showPwCheck)}
          />
        ) : (
          <img
            src={eyeClosed}
            alt="eye-closed"
            className="absolute top-[47px] right-3 w-[24px] h-[24px]"
            onClick={() => setShowPwCheck(!showPwCheck)}
          />
        )}
      </div>

      <div>
        <p className="text-[12px] font-medium text-[#6A6A6A] leading-5">
          ※ 비밀번호는 8자 이상으로 설정해주세요 <br />※ 영문 및 숫자를
          포함하도록 설정해주세요
        </p>
      </div>

      <button
        type="submit"
        className="fixed bottom-[240px] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main disabled:bg-[#9E9E9E]
           text-[14px] font-bold text-white"
        disabled={!(inputValid.pw && inputValid.pwCheck)}
      >
        다음
      </button>
    </div>
  );
};
