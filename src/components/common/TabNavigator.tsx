import { Link, useLocation } from "react-router-dom";
import mainActiveIcon from "@assets/nav/main-active.svg";
import mainUnactiveIcon from "@assets/nav/main-unactive.svg";
import menuActiveIcon from "@assets/nav/menu-active.svg";
import menuUnactiveIcon from "@assets/nav/menu-unactive.svg";
import settingActiveIcon from "@assets/nav/setting-active.svg";
import settingUnactiveIcon from "@assets/nav/setting-unactive.svg";
import { useState } from "react";

export const TabNavigator = () => {
  const [navStatus, setNavStatus] = useState<string>("");

  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed left-1/2 bottom-0 -translate-x-1/2 flex justify-around items-center bg-white w-full min-w-[360px] max-w-[400px] h-[54px] border-t border-solid border-t-[#F0F0F0] shadow-[0_-2px_4px_0_rgba(0,0,0,0.04)]">
      <Link
        to={"/"}
        onClick={() => setNavStatus("메인")}
        className="flex flex-col items-center w-[60px] h-[42px]"
      >
        <img
          src={path === "/" ? mainActiveIcon : mainUnactiveIcon}
          alt="main-icon"
          className="w-[24px] h-[24px] mb-[2px]"
        />
        <strong
          className={
            navStatus === "메인"
              ? "text-xs font-bold text-[#134b84]"
              : "text-xs font-normal text-[#6a6a6a]"
          }
        >
          메인
        </strong>
      </Link>
      <Link
        to={"/weekly-menu"}
        onClick={() => setNavStatus("금주의 메뉴")}
        className="flex flex-col items-center w-[65px] h-[42px]"
      >
        <img
          src={path === "/weekly-menu" ? menuActiveIcon : menuUnactiveIcon}
          alt="main-icon"
          className="w-[24px] h-[24px] mb-[2px]"
        />
        <strong
          className={
            navStatus === "금주의 메뉴"
              ? "text-xs font-bold text-[#134b84]"
              : "text-xs font-normal text-[#6a6a6a]"
          }
        >
          금주의 메뉴
        </strong>
      </Link>
      <Link
        to={"/setting"}
        onClick={() => setNavStatus("설정")}
        className="flex flex-col items-center w-[60px] h-[42px]"
      >
        <img
          src={path === "/setting" ? settingActiveIcon : settingUnactiveIcon}
          alt="main-icon"
          className="w-[24px] h-[24px] mb-[2px]"
        />
        <strong
          className={
            navStatus === "설정"
              ? "text-xs font-bold text-[#134b84]"
              : "text-xs font-normal text-[#6a6a6a]"
          }
        >
          설정
        </strong>
      </Link>
    </div>
  );
};
