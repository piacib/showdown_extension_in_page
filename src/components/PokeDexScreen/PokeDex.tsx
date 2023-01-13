import React from "react";

import styled, { css } from "styled-components";
const Border = css`
  border: 1px solid black;
`;
export const ContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 40px;
  justify-content: space-between;
`;
export const Container = styled.div`
  border: 3px solid black;
  border-radius: 0 0 0 15px;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  padding: 5px 10px;
`;
export const InnerContainer = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  width: 100%;
  margin: 5px 0;
  padding: 2px;
`;
export const RedCircle = styled.div`
  ${Border}
  border-radius: 50%;
  background: ${(props) => props.theme.color.pokedexRed};
`;
export const RedCircleTop = styled(RedCircle)`
  grid-row: 1;
  height: 10px;
  width: 10px;
`;
export const RedCircleBottom = styled(RedCircle)`
  grid-row: 3;
  height: 15px;
  width: 15px;
`;
export const ContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const BarContainer = styled.div`
  width: 10%;
  margin-right: 5px;
  * {
    width: 100%;
    height: 3px;
    background: black;
    margin: 2px 0;
  }
`;
interface Props {
  children: React.ReactNode;
}
const PokeDexScreen: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <ContainerTop>
        <RedCircleTop />
        <RedCircleTop />
      </ContainerTop>
      <InnerContainer>{children}</InnerContainer>
      <ContainerBottom>
        <RedCircleBottom />
        <BarContainer>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </BarContainer>
      </ContainerBottom>
    </Container>
  );
};

export default PokeDexScreen;
