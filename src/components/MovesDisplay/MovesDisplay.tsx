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
interface MovesProps {
  move: MoveData;
}
export const MoveInfoPopUp: React.FC<MovesProps> = ({ move }) => {
  return (
    <MoveInfo>
      <MoveDescription>{move.shortDesc}</MoveDescription>
      <MoveType background={move.type}>{move.type}</MoveType>
      {typeof move.accuracy === "number" && <MoveProperty>Accuracy: {move.accuracy}%</MoveProperty>}
      {Boolean(move.priority) && <MoveProperty>Priority: {move.priority}</MoveProperty>}
      {Boolean(move.basePower) && <MoveProperty>Power: {move.basePower}</MoveProperty>}
      <MoveProperty>Category: {move.category}</MoveProperty>
    </MoveInfo>
  );
};

interface MovesDisplayProps {
  movesData: MoveData[];
}
/**  movesData: MoveData[]  @pkmn/dex-types */
const MovesDisplay: React.FC<MovesDisplayProps> = ({ movesData }) => {
  return (
    <MovesContainer>
      <h3>Moves:</h3>
      {movesData?.map((move) =>
        move ? (
          <MoveBtn background={move.type} key={move.name}>
            <p>{move.name}</p>
            <HiddenPropertyText>
              <MoveInfoPopUp move={move} />
            </HiddenPropertyText>
          </MoveBtn>
        ) : (
          <></>
        )
      )}
    </MovesContainer>
  );
};
export default MovesDisplay;
