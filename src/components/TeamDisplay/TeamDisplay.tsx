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
  const [teams] = useTeams(roomId);
  const [index, setIndex] = useState(0);

  const [displayedPokemon, setDisplayedPokemon] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffec teams changed");
    const defaultPokemon = teams[Number(opponentsTeam)][0];
    if (defaultPokemon !== "Not Revealed" && teams[Number(opponentsTeam)][1]) {
      setDisplayedPokemon(teams[Number(opponentsTeam)][0]);
    }
  }, [teams]);
  useEffect(() => {
    console.log("useEff teams", teams, displayedPokemon);
    const displayedTeam = teams[Number(opponentsTeam)];
    if (!displayedPokemon || !displayedTeam.includes(displayedPokemon)) {
      console.log("chagning pkmdis");
      setDisplayedPokemon(displayedTeam[0]);
    }
  }, [teams, opponentsTeam, displayedPokemon]);

  console.log("team dispk", displayedPokemon);
  let pokemon = teams[Number(opponentsTeam)][index];
  return (
    <>
      {teams && teams[0] ? (
        <>
          <PokeDexScreen>
            <ButtonDisplay>
              {teams[Number(opponentsTeam)]?.map((x, idx) => (
                <Button
                  key={pokemonNameFilter(x) + idx}
                  onClick={() => {
                    setDisplayedPokemon(getPokemonName(x));
                    setIndex(idx);
                  }}
                  disabled={x === "Not revealed"}
                >
                  <SpriteImage name={pokemonNameFilter(x)} />
                </Button>
              ))}
            </ButtonDisplay>
          </PokeDexScreen>

          <PokemonDataDisplay pokemon={pokemon} roomId={roomId} />
        </>
      ) : (
        <LoadingButtonDisplay />
      )}
    </>
  );
};
