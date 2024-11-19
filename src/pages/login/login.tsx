import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/common/logo.svg";
import eyeOpen from "@assets/login/eye_open.svg";
import eyeClosed from "@assets/login/eye_closed.svg";
import { useEffect, useState } from "react";
import { useSignUpStatusStore } from "@store/signupStore";
import { requestLogin } from "@apis/login";
import { useShallow } from "zustand/shallow";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setSignupStatus, setSignupFormData } = useSignUpStatusStore(
    useShallow((state) => ({
      setSignupStatus: state.setSignupStatus,
      setSignupFormData: state.setSignupFormData,
    }))
  );
  const [inputValue, setInputValue] = useState({
    student_id: "",
    password: "",
  });
  const [showFailedAlert, setShowFailedAlert] = useState<boolean>(false);
  const [showPw, setShowPw] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setInputValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const submitLogin = async () => {
    const response = await requestLogin(inputValue);

    // 로그인 변경 실패 예외처리
    if (!response) {
      setShowFailedAlert(true);
      const timer = setTimeout(() => {
        setShowFailedAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // 로그인 변경 성공
    setShowFailedAlert(false);
    navigate("/");
  };

  // 회원가입 폼 데이터 초기화
  useEffect(() => {
    setSignupFormData({ student_id: "", nickname: "", password: "" });
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <header className="flex justify-center items-center w-[360px] h-[50px] mb-[20px]">
        <img src={logo} alt="logo-image" />
      </header>

      <div>
        <div className="flex flex-col w-[344px] h-[81px] mb-[24px]">
          <label
            htmlFor="student_id"
            className="mb-[12px] text-[14px] font-bold text-[#1D1D1D]"
          >
            학번
          </label>
          <input
            type="text"
            id="student_id"
            className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
            placeholder="학번을 입력해주세요"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col relative w-[344px] h-[81px] mb-[12px]">
          <label
            htmlFor="password"
            className="mb-[12px] text-[14px] font-bold text-[#1D1D1D] "
          >
            비밀번호
          </label>
          <input
            type={showPw ? "text" : "password"}
            id="password"
            className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0] focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
          />
          {showPw ? (
            <img
              src={eyeOpen}
              alt="eye-open"
              className="absolute top-[45px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowPw(!showPw)}
            />
          ) : (
            <img
              src={eyeClosed}
              alt="eye-closed"
              className="absolute top-[45px] right-3 w-[24px] h-[24px]"
              onClick={() => setShowPw(!showPw)}
            />
          )}
        </div>
      </div>

      <button className="flex justify-end w-[344px] mb-[24px] text-[12px] text-[#444444] leading-[1.5]">
        비밀번호 찾기
      </button>

      <div className="flex flex-col items-center ">
        <Link
          to={"/signup"}
          className="flex justify-center items-center w-[344px] h-[48px] rounded-[4px] mb-[12px] border-[1px] border-solid border-main text-[14px] font-medium text-main"
          onClick={() => setSignupStatus("id")}
        >
          회원가입
        </Link>
        <button
          className="w-[344px] h-[48px] rounded-[4px] text-[14px] text-white bg-main"
          onClick={submitLogin}
        >
          로그인
        </button>
      </div>

      {/* 로그인 실패 알림 */}
      {showFailedAlert && (
        <div className="absolute top-1/3 flex justify-center items-center w-[344px] h-[64px] rounded-[8px] bg-black-70 text-[16px] font-medium text-white animate-fadeUpToDown">
          학번 또는 비밀번호를 다시 확인해주세요
        </div>
      )}
    </div>
  );
};
