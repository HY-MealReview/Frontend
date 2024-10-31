import { Link } from "react-router-dom";

export const NicknameStep = () => {
  return (
    <div>
      <strong className="block w-[344px] h-[60px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
        서비스에서 사용할 <br />
        <span className="font-bold">닉네임</span>을 입력해주세요
      </strong>

      <input
        type="text"
        className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
        placeholder="닉네임123"
      />

      <Link
        to={"/"}
        className="flex justify-center items-center fixed bottom-[240px] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main text-[14px] font-bold text-white"
      >
        회원가입 완료
      </Link>
    </div>
  );
};
