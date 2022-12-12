import styled, { css } from "styled-components";
import { TypeColorInterface } from "../../types";
import { typeColorConverter } from "../PokemonDataDisplay/pokemonTypeColorConverter";
import {
  HiddenPropertyText,
  hoverDisplayCss,
  propertyCss,
  PropertyDisplay,
} from "../PokemonDataDisplay/DataDisplay.style";
import { TypeColoredComponent } from "../EffectivnessDisplay/EffectivnessDisplay.style";

export const MoveBtn = styled(TypeColoredComponent)`
  ${hoverDisplayCss}
  ${propertyCss}
  &:hover ${HiddenPropertyText} {
    left: 0;
    min-width: 170px;
    padding: ${(props) => props.theme.padding.medium};
    font-size: 1.1rem;
    margin: 5px 0;
  }
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
export const TypeColorBackground = css<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
`;
export const MoveType = styled(MoveProperty)`
  ${TypeColorBackground}
  padding: ${(props) => props.theme.padding.small};
  width: fit-content;
  margin: 0 auto;
`;
