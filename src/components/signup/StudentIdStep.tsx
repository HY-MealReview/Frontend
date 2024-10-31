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
  const [inputValid, setInputValid] = useState<boolean>(false);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInputValid(value.trim().length === 8 && !isNaN(Number(value)));
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

      <button
        type="submit"
        className="fixed bottom-[240px] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main disabled:bg-[#9E9E9E]
           text-[14px] font-bold text-white"
        disabled={!inputValid}
        onClick={() => setSignupStatus("pw")}
      >
        다음
      </button>
    </div>
  );
};
