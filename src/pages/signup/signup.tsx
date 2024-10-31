import { NicknameStep } from "@components/signup/NicknameStep";
import { PasswordStep } from "@components/signup/PasswordStep";
import { SignUpLayout } from "@components/signup/SignUpLayout";
import { StudentIdStep } from "@components/signup/StudentIdStep";
import { useSignUpStatusStore } from "@store/signupStore";
import { useShallow } from "zustand/shallow";

export const SignUpPage = () => {
  const { signupStatus } = useSignUpStatusStore(
    useShallow((state) => ({ signupStatus: state.signupStatus }))
  );
  console.log(signupStatus);

  return (
    <SignUpLayout>
      {signupStatus === "id" && <StudentIdStep />}
      {signupStatus === "pw" && <PasswordStep />}
      {signupStatus === "nickname" && <NicknameStep />}
    </SignUpLayout>
  );
};
