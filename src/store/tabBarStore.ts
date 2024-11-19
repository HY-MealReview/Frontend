import { create } from "zustand";

type Store = {
  isTabBarVisible: boolean;
  setIsTabBarVisible: (isTabBarVisible: boolean) => void;
};

export const useTabBarStore = create<Store>()((set) => ({
  isTabBarVisible: true,
  setIsTabBarVisible: (isTabBarVisible) =>
    set(() => ({ isTabBarVisible: isTabBarVisible })),
}));
