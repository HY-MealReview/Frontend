import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="min-w-[360px] max-w-[400px] h-screen bg-white pb-[54px] my-0 mx-auto overflow-auto
    "
    >
      {children}
    </div>
  );
};
