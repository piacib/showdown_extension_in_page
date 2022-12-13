import React from "react";
import styled, { css } from "styled-components";
import { PropertyDisplay } from "./components/PokemonDataDisplay/DataDisplay.style";
import { typeColorConverter } from "./functions";
import { TypeColorInterface } from "./types";
export const RefreshButton = styled.button`
  grid-column: 3/4;
  background-color: transparent;
  grid-row: 1;
  border: none;
  position: relative;
  justify-self: end;
  align-self: center;
  border-radius: 50%;
  width: 4em;
  height: 4em;
`;
export const Refresh = styled.img`
  width: 100%;
`;
export const Button = styled.button`
border: none;
  /* height: var(--height); */
  /* line-height: var(--height); */
  white-space: 0;
  /* grid-row: 1; */
  /* grid-column: 2; */
  border-radius: 20px;
  /* justify-self: center; */
  background-color: ${(props) => props.theme.color.pokedexRed};
  /* align-self: center; */
  position: absolute;
  left: 5px;
  top: 25px;
`;
interface RefProp extends React.FC {
  changeDisplay: boolean;
}
export const AppDisplay = styled.div<RefProp>`
  min-width: 100px;
  padding: 36px 8px 0;
  display: ${(props) => (props.changeDisplay ? "flex" : "grid")};
  min-height: 250px;
  flex-direction: column;
  font-size: 12px;
  grid-gap: 15px;
`;
export const BottomBorder = styled.div`
  margin: 6px 0;
  padding: 4px 8px;
  border: 1px solid #aaa;
  background: #e0e7ea;
`;
export const TypeColorBackground = css<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
`;
export const TypeColoredComponent = styled.div`
  ${TypeColorBackground}
`;
export const PillDesign = css`
  margin: 5px;
  padding: 0.1rem 0.25rem;
  border-radius: 10px;
  font-size: 1rem;
`;
