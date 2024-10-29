import prevArrow from "@assets/common/prev-arrow.svg";
import classNames from "classnames";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eyeClosed from "@assets/login/eye_closed.svg";
import eyeOpen from "@assets/login/eye_open.svg";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("id");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showPwcheck, setShowPwCheck] = useState<boolean>(false);

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

        {/* 회원가입_학번 */}
        {status === "id" && (
          <div>
            <strong className="block w-[344px] h-[60px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
              학생인증을 위해 <br />
              <span className="font-bold">학번</span>을 입력해주세요
            </strong>

            <input
              type="text"
              className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
              placeholder="0000000000"
            />
          </div>
        )}
        {/* 회원가입_비밀번호 */}
        {status === "pw" && (
          <div>
            <strong className="block w-[344px] h-[30px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
              <span className="font-bold">비밀번호</span>를 입력해주세요
            </strong>

            <div className="relative flex flex-col mb-[12px]">
              <label
                htmlFor="pw"
                className="text-[14px] font-bold leading-6 mb-[12px]"
              >
                비밀번호
              </label>
              <input
                type={showPw ? "text" : "password"}
                id="pw"
                className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
                placeholder="0000000000"
              />
              {showPw ? (
                <img
                  src={eyeOpen}
                  alt="eye-open"
                  className="absolute top-[47px] right-3 w-[24px] h-[24px]"
                  onClick={() => setShowPw(!showPw)}
                />
              ) : (
                <img
                  src={eyeClosed}
                  alt="eye-closed"
                  className="absolute top-[47px] right-3 w-[24px] h-[24px]"
                  onClick={() => setShowPw(!showPw)}
                />
              )}
            </div>

            <div className="relative flex flex-col mb-[12px]">
              <label
                htmlFor="pw-check"
                className="text-[14px] font-bold leading-6 mb-[12px]"
              >
                비밀번호 확인
              </label>
              <input
                type={showPwcheck ? "text" : "password"}
                id="pw-check"
                className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
                placeholder="0000000000"
              />
              {showPwcheck ? (
                <img
                  src={eyeOpen}
                  alt="eye-open"
                  className="absolute top-[47px] right-3 w-[24px] h-[24px]"
                  onClick={() => setShowPwCheck(!showPwcheck)}
                />
              ) : (
                <img
                  src={eyeClosed}
                  alt="eye-closed"
                  className="absolute top-[47px] right-3 w-[24px] h-[24px]"
                  onClick={() => setShowPwCheck(!showPwcheck)}
                />
              )}
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#6A6A6A] leading-5">
                ※ 비밀번호는 8자 이상으로 설정해주세요 <br />※ 영문 및 숫자를
                포함하도록 설정해주세요
              </p>
            </div>
          </div>
        )}

        {/* 회원가입_닉네임 */}
        {status === "nickname" && (
          <>
            <strong className="block w-[344px] h-[60px] mb-[12px] text-[20px] font-normal text-[#1D1D1D] ">
              서비스에서 사용할 <br />
              <span className="font-bold">닉네임</span>을 입력해주세요
            </strong>

            <input
              type="text"
              className="w-[344px] h-[48px] rounded-[4px] pl-[12px] text-[12px] bg-[#F0F0F0]  focus:bg-white focus:border-[1px] focus:border-solild focus:border-[#1D1D1D] placeholder:text-[12px]  placeholder:text-[#6A6A6A]"
              placeholder="닉네임123"
            />
          </>
        )}
      </div>

      {status === "nickname" ? (
        <Link
          to={"/"}
          className="flex justify-center items-center fixed bottom-[240px] left-1/2 -translate-x-1/2 w-[344px] h-[48px] rounded-[4px] bg-main text-[14px] font-bold text-white"
        >
          회원가입 완료
        </Link>
      ) : (
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
      )}
    </>
  );
};
