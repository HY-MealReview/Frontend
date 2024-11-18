import { create } from "zustand";

type Store = {
  signupStatus: string;
  setSignupStatus: (netStatus: string) => void;
  signupFormData: {
    student_id: string;
    nickname: string;
    password: string;
  };
  setSignupFormData: (data: {
    student_id?: string;
    nickname?: string;
    password?: string;
  }) => void;
};

export const useSignUpStatusStore = create<Store>()((set) => ({
  signupStatus: "",
  setSignupStatus: (newStatus) => set(() => ({ signupStatus: newStatus })),
  signupFormData: {
    student_id: "",
    nickname: "",
    password: "",
  },
  setSignupFormData: (data) =>
    set((state) => ({
      signupFormData: {
        ...state.signupFormData,
        ...data,
      },
    })),
}));
