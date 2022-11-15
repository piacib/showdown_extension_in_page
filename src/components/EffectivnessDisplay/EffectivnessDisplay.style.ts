import styled from "styled-components";
import { typeColorConverter } from "../PokemonDataDisplay/pokemonTypeColorConverter";
import { TypeColorInterface } from "../../types";
export const DamageGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
  flex-wrap: wrap;
`;
export const TypeBox = styled.div<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
  margin: 5px;

  padding: ${(props) => props.theme.padding.small} ${(props) => props.theme.padding.medium};
  border-radius: 10px;
  display: flex;
  align-items: center;
`;
export const Effectivness = styled.p`
  background: snow;
  border-radius: 50%;
  padding: 2px;
  margin: 0;
  height: 1.2rem;
  width: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    align-self: flex-start;
    margin-left: 1px;
  }
`;
export const Type = styled.p`
  margin: 0 0.5rem 0 0;
`;
