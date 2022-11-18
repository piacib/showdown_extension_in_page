import styled, { css } from "styled-components";
import {
  HiddenPropertyText,
  hoverDisplayCss,
  PropertyDisplay,
} from "../PokemonDataDisplay/DataDisplay.style";
import { PillDesign, TypeColorBackground, TypeColoredComponent } from "../../App.style";

export const MoveBtn = styled(TypeColoredComponent)`
  ${hoverDisplayCss}
  ${PillDesign}
  &:hover ${HiddenPropertyText} {
    left: 0;
    min-width: 170px;
    padding: ${(props) => props.theme.padding.medium};
    font-size: 1.1rem;
    margin: 5px 0;
  }
  p {
    margin: 0.3rem 0;
  }
  border: none;
`;
export const MoveInfo = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
`;
const cssMoveProperty = css`
  white-space: nowrap;
`;
export const MoveProperty = styled.li`
  ${cssMoveProperty}
`;
export const MoveDescription = styled(MoveProperty)`
  white-space: initial;
`;
export const MovesContainer = styled(PropertyDisplay)`
  display: flex;
  position: relative;
`;

export const MoveType = styled(MoveProperty)`
  ${TypeColorBackground}
  padding: ${(props) => props.theme.padding.small};
  /* ${(props) => props.theme.padding.medium}; */
  width: fit-content;
  margin: 0 auto;
`;
