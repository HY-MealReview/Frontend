import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import prevArrow from "@assets/common/prev-arrow.svg";

export const ChangeNickname = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValid, setInputValid] = useState<boolean>(false);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInputValid(value.trim().length > 0);
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
        <h1 className="text-[16px] font-medium text-[#1D1D1D]">닉네임 변경</h1>
      </header>

      <input
        type="text"
        value={inputValue}
        className={`w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solid focus:border-[#1D1D1D]
          ${
            !inputValid &&
            inputValue.length > 0 &&
            "border-[1px] border-solid border-[#FF3B30]"
          }  placeholder:text-[12px]  placeholder:text-[#6A6A6A]`}
        placeholder="닉네임123"
        onChange={handleInputValid}
      />
      {inputValue.length > 0 && !inputValid && (
        <span className="absolute top-[125px] left-[30px] text-[12px] font-medium text-[#FF3B30]">
          ※ 중복된 닉네임입니다
        </span>
      )}

      <Link
        to={"/login"}
        className={`flex justify-center items-center fixed bottom-[15%] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main ${
          inputValid || "bg-[#9E9E9E]"
        } text-[14px] font-bold text-white`}
        onClick={(e) => {
          inputValid || e.preventDefault();
        }}
      >
        변경사항 저장
      </Link>
    </div>
  );
};
