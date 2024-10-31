import { NicknameStep } from "@components/signup/NicknameStep";
import { PasswordStep } from "@components/signup/PasswordStep";
import { SignUpLayout } from "@components/signup/SignUpLayout";
import { StudentIdStep } from "@components/signup/StudentIdStep";
import { useSignUpStatusStore } from "@store/signupStore";
import { useShallow } from "zustand/shallow";

export const SignUpPage = () => {
  const status = useSignUpStatusStore(useShallow((state) => state.status));
  console.log(status);

  return (
    <SignUpLayout>
      {status === "id" && <StudentIdStep />}
      {status === "pw" && <PasswordStep />}
      {status === "nickname" && <NicknameStep />}
    </SignUpLayout>
  );
};
