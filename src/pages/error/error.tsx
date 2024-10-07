import styled from "styled-components";
import errorImg from "@assets/error/error.png";

export const Errorpage = () => {
  return (
    <Wrapper>
      <img src={errorImg} alt="error-image" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
