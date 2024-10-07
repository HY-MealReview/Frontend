import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
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
    <Wrapper>
      <StyledLink to={"/"} onClick={() => setNavStatus("메인")}>
        <img
          src={path === "/" ? mainActiveIcon : mainUnactiveIcon}
          alt="main-icon"
        />
        <strong className={navStatus === "메인" ? "active" : "unactive"}>
          메인
        </strong>
      </StyledLink>
      <StyledLink
        to={"/weekly-menu"}
        onClick={() => setNavStatus("금주의 메뉴")}
      >
        <img
          src={path === "/weekly-menu" ? menuActiveIcon : menuUnactiveIcon}
          alt="main-icon"
        />
        <strong className={navStatus === "금주의 메뉴" ? "active" : "unactive"}>
          금주의 메뉴
        </strong>
      </StyledLink>
      <StyledLink to={"/setting"} onClick={() => setNavStatus("설정")}>
        <img
          src={path === "/setting" ? settingActiveIcon : settingUnactiveIcon}
          alt="main-icon"
        />
        <strong className={navStatus === "설정" ? "active" : "unactive"}>
          설정
        </strong>
      </StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  min-width: 360px;
  max-width: 400px;
  height: 54px;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.04);
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 42px;

  img {
    width: 24px;
    height: 24px;
    margin-bottom: 2px;
  }

  .unactive {
    font-size: 12px;
    font-weight: 400;
    color: #6a6a6a;
  }

  .active {
    font-size: 12px;
    font-weight: 700;
    color: #134b84;
  }
`;
