import { create } from "zustand";

type Store = {
  signupStatus: string;
  setSignupStatus: (netStatus: string) => void;
};

export const useSignUpStatusStore = create<Store>()((set) => ({
  signupStatus: "",
  setSignupStatus: (newStatus) => set(() => ({ signupStatus: newStatus })),
}));
