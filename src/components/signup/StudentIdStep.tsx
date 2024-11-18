import { checkIdRedundancy } from "@apis/signup";
import { useSignUpStatusStore } from "@store/signupStore";
import { ChangeEvent, useState } from "react";
import { useShallow } from "zustand/shallow";

export const StudentIdStep = () => {
  const { setSignupStatus, setSignupFormData } = useSignUpStatusStore(
    useShallow((state) => ({
      setSignupStatus: state.setSignupStatus,
      setSignupFormData: state.setSignupFormData,
    }))
  );
  const [showFailedAlert, setShowFailedAlert] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValid, setInputValid] = useState<boolean>(true);

  const handleInputValid = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = async () => {
    // 학번 형식 확인
    if (inputValue.length !== 10) {
      setShowFailedAlert(true);
      const timer = setTimeout(() => {
        setShowFailedAlert(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }

    const response = await checkIdRedundancy(inputValue);
    // 중복 예외 처리
    if (!response) {
      setInputValid(false);
      return;
    }

    // 중복 아닐 때
    setSignupStatus("pw");
    setSignupFormData({ student_id: inputValue });
    setShowFailedAlert(false);
  };

  return (
    <div className="relative flex flex-col items-center w-full ">
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

      {showFailedAlert && (
        <div className="absolute top-1/3 flex justify-center items-center w-[344px] h-[64px] rounded-[8px] bg-black-70 text-[16px] font-medium text-white animate-fadeUpToDown">
          올바른 학번 형식이 아닙니다
        </div>
      )}

      {!inputValid && (
        <span className="absolute top-[125px] left-[30px] text-[12px] font-medium text-[#FF3B30]">
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
