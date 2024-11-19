import { useTabBarStore } from "@store/tabBarStore";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useShallow } from "zustand/shallow";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { setIsTabBarVisible } = useTabBarStore(
    useShallow((state) => ({
      setIsTabBarVisible: state.setIsTabBarVisible,
    }))
  );

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsTabBarVisible(false);
    } else {
      setIsTabBarVisible(true);
    }
  }, []);
  return (
    <div
      className="min-w-[360px] max-w-[400px] h-screen bg-white pb-[72px] my-0 mx-auto overflow-auto
    "
    >
      {children}
    </div>
  );
};
