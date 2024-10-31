import { create } from "zustand";

type Store = {
  status: string;
  setStatus: (netStatus: string) => void;
};

export const useSignUpStatusStore = create<Store>()((set) => ({
  status: "id",
  setStatus: (newStatus) => set(() => ({ status: newStatus })),
}));
