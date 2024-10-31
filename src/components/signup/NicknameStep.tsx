import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

export const NicknameStep = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValid, setInputValid] = useState<boolean>(false);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInputValid(value.trim().length > 0);
  };

  return (
    <div className="relative flex flex-col items-center w-full ">
      <strong className="block w-[344px] h-[60px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
        서비스에서 사용할 <br />
        <span className="font-bold">닉네임</span>을 입력해주세요
      </strong>

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
        className={`flex justify-center items-center fixed bottom-[240px] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main ${
          inputValid || "bg-[#9E9E9E]"
        } text-[14px] font-bold text-white`}
        onClick={(e) => {
          inputValid || e.preventDefault();
        }}
      >
        회원가입 완료
      </Link>
    </div>
  );
};
