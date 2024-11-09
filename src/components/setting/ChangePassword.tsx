import eyeClosed from "@assets/login/eye_closed.svg";
import eyeOpen from "@assets/login/eye_open.svg";
import { ChangeEvent, useState } from "react";
import prevArrow from "@assets/common/prev-arrow.svg";
import { useNavigate } from "react-router-dom";
import { changePassword } from "@apis/setting";

export const ChangePasswords = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    oldPw: "",
    newPw: "",
    newPwCheck: "",
  });
  const [inputValid, setInputValid] = useState({
    oldPw: false,
    newPw: false,
    newPwCheck: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    oldPw: "",
    newPw: "",
    newPwCheck: "",
  });
  const [showOldPw, setShowOldPw] = useState<boolean>(false);
  const [showNewPw, setShowNewPw] = useState<boolean>(false);
  const [showNewPwCheck, setShowNewPwCheck] = useState<boolean>(false);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const regexPw = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    setInputValue((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "oldPw" || id === "newPw") {
      setInputValid((prev) => ({
        ...prev,
        [id]: regexPw.test(value) && value.trim().length >= 8,
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
    } else if (id === "newPwCheck") {
      setInputValid((prev) => ({
        ...prev,
        [id]: value === inputValue.newPw,
      }));

      if (value !== inputValue.newPw) {
        setErrorMessage((prev) => ({
          ...prev,
          [id]: "비밀번호가 일치하지 않습니다",
        }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        old_password: inputValue.oldPw,
        new_password: inputValue.newPw,
      };
      const response = await changePassword(data);
      console.log(response);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full ">
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

      <section>
        {/* 현재 비밀번호 */}
        <div className="relative flex flex-col mb-[12px]">
          <label
            htmlFor="oldPw"
            className="text-[14px] font-bold leading-6 mb-[12px]"
          >
            현재 비밀번호
          </label>
          {inputValue.oldPw.length === 0 || inputValid.oldPw ? null : (
            <span className="absolute top-[3px] left-[100px] text-[12px] font-medium text-[#FF3B30]">
              {errorMessage.oldPw}
            </span>
          )}
          <input
            type={showOldPw ? "text" : "password"}
            id="oldPw"
            value={inputValue.oldPw}
            className={`w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solid focus:border-[#1D1D1D]
 ${
   !inputValid.oldPw &&
   inputValue.oldPw.length > 0 &&
   "border-[1px] border-solid border-[#FF3B30]"
 }  placeholder:text-[12px]  placeholder:text-[#6A6A6A]`}
            placeholder="0000000000"
            onChange={handleInputValid}
          />
          {showOldPw ? (
            <img
              src={eyeOpen}
              alt="eye-open"
              className="absolute top-[47px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowOldPw(!showOldPw)}
            />
          ) : (
            <img
              src={eyeClosed}
              alt="eye-closed"
              className="absolute top-[47px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowOldPw(!showOldPw)}
            />
          )}
        </div>

        {/* 새 비밀번호 */}
        <div className="relative flex flex-col mb-[12px]">
          <label
            htmlFor="newPw"
            className="text-[14px] font-bold leading-6 mb-[12px]"
          >
            새 비밀번호
          </label>
          {inputValue.newPw.length === 0 || inputValid.newPw ? null : (
            <span className="absolute top-[3px] left-[100px] text-[12px] font-medium text-[#FF3B30]">
              {errorMessage.newPw}
            </span>
          )}
          <input
            type={showNewPw ? "text" : "password"}
            id="newPw"
            value={inputValue.newPw}
            className={`w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solid focus:border-[#1D1D1D]
 ${
   !inputValid.newPw &&
   inputValue.newPw.length > 0 &&
   "border-[1px] border-solid border-[#FF3B30]"
 }  placeholder:text-[12px]  placeholder:text-[#6A6A6A]`}
            placeholder="0000000000"
            onChange={handleInputValid}
          />
          {showNewPw ? (
            <img
              src={eyeOpen}
              alt="eye-open"
              className="absolute top-[47px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowNewPw(!showNewPw)}
            />
          ) : (
            <img
              src={eyeClosed}
              alt="eye-closed"
              className="absolute top-[47px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowNewPw(!showNewPw)}
            />
          )}
        </div>

        {/* 새 비밀번호 확인*/}
        <div className="relative flex flex-col mb-[12px]">
          <label
            htmlFor="newPwCheck"
            className="text-[14px] font-bold leading-6 mb-[12px]"
          >
            새 비밀번호 확인
          </label>
          {inputValue.newPwCheck.length === 0 ||
          inputValid.newPwCheck ? null : (
            <span className="absolute top-[3px] left-[125px] text-[12px] font-medium text-[#FF3B30]">
              {errorMessage.newPwCheck}
            </span>
          )}

          <input
            type={showNewPwCheck ? "text" : "password"}
            id="newPwCheck"
            value={inputValue.newPwCheck}
            className={`w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solid focus:border-[#1D1D1D]
            ${
              !inputValid.newPwCheck &&
              inputValue.newPwCheck.length > 0 &&
              "border-[1px] border-solid border-[#FF3B30]"
            }  placeholder:text-[12px]  placeholder:text-[#6A6A6A]`}
            placeholder="0000000000"
            onChange={handleInputValid}
          />
          {showNewPwCheck ? (
            <img
              src={eyeOpen}
              alt="eye-open"
              className="absolute top-[47px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowNewPwCheck(!showNewPwCheck)}
            />
          ) : (
            <img
              src={eyeClosed}
              alt="eye-closed"
              className="absolute top-[47px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowNewPwCheck(!showNewPwCheck)}
            />
          )}
        </div>

        <div className="flex justify-start">
          <p className="text-[12px] font-medium text-[#6A6A6A] leading-5">
            ※ 비밀번호는 8자 이상으로 설정해주세요 <br />※ 영문 및 숫자를
            포함하도록 설정해주세요
          </p>
        </div>
      </section>

      <button
        type="submit"
        className="fixed bottom-[15%] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main disabled:bg-[#9E9E9E]
           text-[14px] font-bold text-white"
        disabled={
          !(inputValid.oldPw && inputValid.newPw && inputValid.newPwCheck)
        }
        onClick={handleSubmit}
      >
        변경사항 저장
      </button>
    </div>
  );
};
