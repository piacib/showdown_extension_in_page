import React, { useState } from "react";
import { Button, ButtonDisplay } from "./TeamDisplay.style";
import SpriteImage from "../SpriteImage";
import { pokemonNameFilter } from "./TeamDisplay.functions";
import { AppProps } from "../../App";
import { useTeams } from "./useTeams";
import PokeDexScreen from "../PokeDexScreen/PokeDex";
import PokemonDataDisplay from "../PokemonDataDisplay/PokemonDataDisplay";

interface TeamProps extends AppProps {
  opponentsTeam: boolean;
}
// fetches latest pokemon data from auto updating github dataset
export const TeamDisplay = ({ opponentsTeam, roomId }: TeamProps) => {
  const [teams] = useTeams(roomId);
  const [index, setIndex] = useState(0);

  const pokemon = teams[Number(opponentsTeam)][index];
  return (
    <>
      <PokeDexScreen>
        <ButtonDisplay>
          {teams[Number(opponentsTeam)]?.map((x, idx) => (
            <Button
              key={pokemonNameFilter(x) + idx}
              onClick={() => setIndex(idx)}
              disabled={x === "Not revealed"}
            >
              <SpriteImage name={pokemonNameFilter(x)} />
            </Button>
          ))}
        </ButtonDisplay>
      </PokeDexScreen>
      <PokemonDataDisplay pokemon={pokemon} roomId={roomId} />
    </>
  );
};
