import styled from "styled-components";
import { typeColorConverter } from "../PokemonDataDisplay/pokemonTypeColorConverter";
import { TypeColorInterface } from "../../types";

export const DamageContainer = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.95rem;
`;
export const DamageMultiplier = styled.p`
  height: 100%;
  vertical-align: middle;
`;
