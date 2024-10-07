import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  min-width: 360px;
  max-width: 400px;
  height: 100vh;
  background-color: white;
  padding-bottom: 54px;
  margin: 0 auto;
  overflow: auto;
`;
