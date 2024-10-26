import prevArrow from "@assets/common/prev-arrow.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("id");
  const [progressBar, setProgressBar] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col items-center w-full ">
        <header className="relative flex justify-center items-center w-full h-[48px] mb-[13px] bg-white">
          <img
            src={prevArrow}
            className="absolute top-1/2 -translate-y-1/2 left-[8px] w-[24px] h-[24px] cursor-pointer"
            alt="prev-arrow"
            onClick={() => {
              status === "id"
                ? navigate(-1)
                : status === "pw"
                ? setStatus("id")
                : setStatus("pw");
            }}
          />
          <h1 className="text-[16px] font-medium text-[#1D1D1D]">회원가입</h1>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F0F0F0]">
            <div className="w-[90px] h-[1px] bg-main" />
          </div>
        </header>

        {status === "id" && (
          <>
            <strong className="block w-[344px] h-[60px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
              학생인증을 위해 <br />
              <span className="font-bold">학번</span>을 입력해주세요
            </strong>

            <input
              type="text"
              className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
              placeholder="0000000000"
            />
          </>
        )}
      </div>

      <button
        type="submit"
        className="fixed bottom-[240px] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main text-[14px] font-bold text-white"
        onClick={() => {
          status === "id"
            ? setStatus("pw")
            : status === "pw"
            ? setStatus("nickname")
            : setStatus("success");
        }}
      >
        다음
      </button>
    </>
  );
};
