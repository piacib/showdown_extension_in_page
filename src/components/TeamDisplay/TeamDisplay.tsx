import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonDisplay } from "./TeamDisplay.style";
import SpriteImage from "../SpriteImage";
import { pokemonNameFilter, getPokemonName, config } from "./TeamDisplay.functions";
import { PokemonUnavailable } from "../ErrorScreens/PokemonUnavailable";
import { isDevelopmentMode, testTeam } from "../../developmentMode";
import { AppProps } from "../../App";
import { useTeams } from "./useTeams";
import { isRandomBattle } from "../../functions";
import PokeDexScreen from "../PokeDexScreen/PokeDex";
import PokemonDataDisplay from "../PokemonDataDisplay/PokemonDataDisplay";
const LoadingButtonDisplay = () => (
  <PokeDexScreen>
    <ButtonDisplay>
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
    </ButtonDisplay>
  </PokeDexScreen>
);
interface TeamProps extends AppProps {
  opponentsTeam: boolean;
}
// fetches latest pokemon data from auto updating github dataset
export const TeamDisplay = ({ opponentsTeam, roomId }: TeamProps) => {
  console.log("TeamDisplay", opponentsTeam, roomId);
  const [teams] = useTeams(roomId);
  const [displayedPokemon, setDisplayedPokemon] = useState<string | null>(null);

  useEffect(() => {
    if (teams) {
      const displayedTeam = teams[Number(opponentsTeam)];
      if (!displayedPokemon || !displayedTeam.includes(displayedPokemon)) {
        console.log("chagning pkmdis");
        setDisplayedPokemon(displayedTeam[0]);
      }
    }
  }, [teams, opponentsTeam, displayedPokemon]);

  return teams && teams[0] ? (
    <>
      <PokeDexScreen>
        <ButtonDisplay>
          {teams[Number(opponentsTeam)].map((x, idx) => (
            <Button
              key={pokemonNameFilter(x) + idx}
              onClick={() => {
                setDisplayedPokemon(getPokemonName(x));
              }}
              disabled={x === "Not revealed"}
            >
              <SpriteImage name={pokemonNameFilter(x)} />
            </Button>
          ))}
        </ButtonDisplay>
      </PokeDexScreen>

      {displayedPokemon ? (
        <PokemonDataDisplay pokemon={displayedPokemon} roomId={roomId} />
      ) : (
        <PokemonUnavailable />
      )}
    </>
  ) : (
    <LoadingButtonDisplay />
  );
};
