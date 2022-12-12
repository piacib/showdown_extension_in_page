import React from "react";
import {
  MoveBtn,
  MoveInfo,
  MoveType,
  MoveDescription,
  MoveProperty,
  MovesContainer,
} from "./MovesDisplay.style";
import { HiddenPropertyText } from "../PokemonDataDisplay/DataDisplay.style";
import { MoveData } from "@pkmn/dex-types";

interface MovesDisplayProps {
  moves: MoveData[];
}
/**  moves: MoveData[]  @pkmn/dex-types */
const MovesDisplay: React.FC<MovesDisplayProps> = ({ moves }) => {
  console.log(moves);
  return (
    <MovesContainer>
      Moves:
      {moves &&
        moves.map((move) => (
          <MoveBtn background={move.type} key={move.name}>
            {move.name}
            <HiddenPropertyText>
              <MoveInfo>
                <MoveDescription>{move?.shortDesc}</MoveDescription>
                <MoveType background={move.type}>{move.type}</MoveType>
                {typeof move.accuracy === "number" && (
                  <MoveProperty>Accuracy: {move.accuracy}%</MoveProperty>
                )}
                {Boolean(move.priority) && <MoveProperty>Priority: {move.priority}</MoveProperty>}
                {Boolean(move.basePower) && <MoveProperty>Power: {move.basePower}</MoveProperty>}
                <MoveProperty>Category: {move.category}</MoveProperty>
              </MoveInfo>
            </HiddenPropertyText>
          </MoveBtn>
        ))}
    </MovesContainer>
  );
};
export default MovesDisplay;
