import eyeClosed from "@assets/login/eye_closed.svg";
import eyeOpen from "@assets/login/eye_open.svg";
import { ChangeEvent, useState } from "react";
import prevArrow from "@assets/common/prev-arrow.svg";
import { useNavigate } from "react-router-dom";

export const ChangePasswords = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    pw: "",
    pwCheck: "",
  });
  const [inputValid, setInputValid] = useState({
    pw: false,
    pwCheck: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    pw: "",
    pwCheck: "",
  });
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showPwCheck, setShowPwCheck] = useState<boolean>(false);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const regexPw = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    setInputValue((prev) => ({
      ...prev,
      [id]: value,
    }));

    switch (id) {
      case "pw":
        setInputValid((prev) => ({
          ...prev,
          pw: regexPw.test(value) && value.trim().length >= 8,
        }));
        if (value.trim().length >= 8) {
          if (!regexPw.test(value)) {
            setErrorMessage((prev) => ({
              ...prev,
              [id]: "영문 및 숫자를 포함해주세요",
            }));
          }
        } else {
          setErrorMessage((prev) => ({
            ...prev,
            [id]: "8자 이상으로 설정해주세요",
          }));
        }
        break;
      case "pwCheck":
        setInputValid((prev) => ({
          ...prev,
          pwCheck: value === inputValue.pw,
        }));

        if (value !== inputValue.pw) {
          setErrorMessage((prev) => ({
            ...prev,
            pwCheck: "비밀번호가 일치하지 않습니다",
          }));
        }
        break;
    }
  };

  return (
    <div className="flex flex-col items-start w-[344px] mx-auto my-0 ">
      <header className="relative flex justify-center items-center w-full h-[48px] mb-[12px] bg-white">
        <img
          src={prevArrow}
          className="absolute top-1/2 -translate-y-1/2 left-[8px] w-[24px] h-[24px] cursor-pointer"
          alt="prev-arrow"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-[16px] font-medium text-[#1D1D1D]">
          비밀번호 변경
        </h1>
      </header>

      <div className="relative flex flex-col mb-[12px]">
        <label
          htmlFor="pw"
          className="text-[14px] font-bold leading-6 mb-[12px]"
        >
          현재 비밀번호
        </label>
        {inputValid.pw ? null : (
          <span className="absolute top-[3px] left-[70px] text-[12px] font-medium text-[#FF3B30]">
            {errorMessage.pw}
          </span>
        )}
        <input
          type={showPw ? "text" : "password"}
          id="pw"
          value={inputValue.pw}
          className={`w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solid focus:border-[#1D1D1D]
 ${
   !inputValid.pw &&
   inputValue.pw.length > 0 &&
   "border-[1px] border-solid border-[#FF3B30]"
 }  placeholder:text-[12px]  placeholder:text-[#6A6A6A]`}
          placeholder="0000000000"
          onChange={handleInputValid}
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
          htmlFor="pw"
          className="text-[14px] font-bold leading-6 mb-[12px]"
        >
          새 비밀번호
        </label>
        {inputValid.pw ? null : (
          <span className="absolute top-[3px] left-[70px] text-[12px] font-medium text-[#FF3B30]">
            {errorMessage.pw}
          </span>
        )}
        <input
          type={showPw ? "text" : "password"}
          id="pw"
          value={inputValue.pw}
          className={`w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solid focus:border-[#1D1D1D]
 ${
   !inputValid.pw &&
   inputValue.pw.length > 0 &&
   "border-[1px] border-solid border-[#FF3B30]"
 }  placeholder:text-[12px]  placeholder:text-[#6A6A6A]`}
          placeholder="0000000000"
          onChange={handleInputValid}
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
          새 비밀번호 확인
        </label>
        {inputValid.pwCheck ? null : (
          <span className="absolute top-[3px] left-[105px] text-[12px] font-medium text-[#FF3B30]">
            {errorMessage.pwCheck}
          </span>
        )}

        <input
          type={showPwCheck ? "text" : "password"}
          id="pwCheck"
          value={inputValue.pwCheck}
          className={`w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solid focus:border-[#1D1D1D]
            ${
              !inputValid.pwCheck &&
              inputValue.pwCheck.length > 0 &&
              "border-[1px] border-solid border-[#FF3B30]"
            }  placeholder:text-[12px]  placeholder:text-[#6A6A6A]`}
          placeholder="0000000000"
          onChange={handleInputValid}
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
        변경사항 저장
      </button>
    </div>
  );
};
