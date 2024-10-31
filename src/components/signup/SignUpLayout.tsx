import classNames from "classnames";
import { ReactNode } from "react";
import prevArrow from "@assets/common/prev-arrow.svg";

export const SignUpLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="relative flex justify-center items-center w-full h-[48px] mb-[13px] bg-white">
        <img
          src={prevArrow}
          className="absolute top-1/2 -translate-y-1/2 left-[8px] w-[24px] h-[24px] cursor-pointer"
          alt="prev-arrow"
        />
        <h1 className="text-[16px] font-medium text-[#1D1D1D]">회원가입</h1>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F0F0F0]">
          <div
            className={classNames(
              " h-[1px] bg-main transition-all duration-700 ease-in-out",
              {
                "w-3/12": status === "id",
                "w-6/12": status === "pw",
                "w-9/12": status === "nickname",
              }
            )}
          />
        </div>
      </header>
      {children}
    </div>
  );
};
