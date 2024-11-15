import { checkIdRedundancy } from "@apis/signup";
import { useSignUpStatusStore } from "@store/signupStore";
import { ChangeEvent, useState } from "react";
import { useShallow } from "zustand/shallow";

export const StudentIdStep = () => {
  const { setSignupStatus } = useSignUpStatusStore(
    useShallow((state) => ({
      setSignupStatus: state.setSignupStatus,
    }))
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValid, setInputValid] = useState<boolean>(true);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = async () => {
    const response = await checkIdRedundancy(inputValue);
    // 중복 예외 처리
    if (!response) {
      setInputValid(false);
      return;
    }
    // 중복 아닐 때
    setSignupStatus("pw");
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <strong className="block w-[344px] h-[60px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
        학생인증을 위해 <br />
        <span className="font-bold">학번</span>을 입력해주세요
      </strong>

      <input
        type="text"
        value={inputValue}
        className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
        placeholder="0000000000"
        onChange={handleInputValid}
      />

      {!inputValid && (
        <span className="absolute top-[115px] left-[30px] text-[12px] font-medium text-[#FF3B30]">
          ※ 중복된 닉네임입니다
        </span>
      )}

      <button
        type="submit"
        className="fixed bottom-[15%] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main disabled:bg-[#9E9E9E]
           text-[14px] font-bold text-white"
        disabled={inputValue.length === 0}
        onClick={handleSubmit}
      >
        다음
      </button>
    </div>
  );
};
