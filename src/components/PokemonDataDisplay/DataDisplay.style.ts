import styled, { css } from "styled-components";

export const PropertyDisplay = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;
export const HiddenPropertyText = styled.div`
  display: none;
`;
export const propertyCss = css`
  padding: ${(props) => props.theme.padding.medium};
  text-align: center;
  margin: 2px;
  font-size: 0.95rem;
  border-radius: ${(props) => props.theme.buttonBorderRadius};

  cursor: pointer;
  div {
    cursor: pointer;
  }
`;
export const hoverDisplayCss = css`
  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    text-align: start;
    background: white;
    z-index: 2;
    border: 1px solid black;
  }
`;
export const PropertyBtn = styled.div`
  ${hoverDisplayCss}
  ${propertyCss}
  border: none;
  background: lightgrey;
`;
export const PokemonName = styled.a`
  align-self: center;
  grid-row: 3;
  text-transform: capitalize;
  grid-column: 1/2;
  font-size: 1.8rem;
  max-width: 11rem;
  padding-bottom: 0.2rem;
  overflow: hidden;
`;
export const PropertiesContainer = styled.div`
  margin: 5px 0 0 0;
  grid-row: 4;
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
interface RefProp extends React.FC {
  changeDisplay: boolean;
}
export const HeaderContainer = styled.div<RefProp>`
  grid-area: 3/1;
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.changeDisplay ? "column" : "row")};
  margin-bottom: 0.3rem;
`;
