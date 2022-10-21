import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonDisplay } from "./TeamDisplay.style";
// import { PokemonDataDisplay } from "../PokemonDataDisplay/PokemonDataDisplay";
import { isRandomBattleReturn } from "../../types";
// import { OpponentsTeamUnavailable } from "../ErrorScreens/OpponentsTeamUnavailable";
// import { PokemonUnavailable } from "../ErrorScreens/PokemonUnavailable";
import SpriteImage from "../SpriteImage";
import {
  getCurrentPokemon,
  pokemonNameFilter,
  getPokemonName,
} from "./TeamDisplay.functions";
import { PokemonDataDisplay } from "../PokemonDataDisplay/PokemonDataDisplay";
import { PokemonUnavailable } from "../ErrorScreens/PokemonUnavailable";
interface TeamProps {
  isRandomBattle: isRandomBattleReturn;
  opponentsTeam: boolean;
}
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
// WORKS

const messageLog = document.getElementsByClassName("inner message-log")[0];

//fetches latest pokemon data from auto updating dataset
export const TeamDisplay = ({ isRandomBattle, opponentsTeam }: TeamProps) => {
  const [teams, setTeams] = useState<[string[], string[]] | null>(null);
  // const [activePokemon, setActivePokemon] = useState<string | null>(
  //   getCurrentPokemon(team)
  // );
  // const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [displayedPokemon, setDisplayedPokemon] = useState<string | null>(null);
  const callback = useCallback((mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        if (mutation.addedNodes[0]?.nodeName === "H2") {
          const teamIcons = document.getElementsByClassName("teamicons");
          const userTeam = [...teamIcons[0].children, ...teamIcons[1].children];
          const opponentsTeam = [
            ...teamIcons[3].children,
            ...teamIcons[4].children,
          ];
          console.log(
            "newturn",
            userTeam.map((pokemon) => pokemonNameFilter(pokemon.ariaLabel)),
            opponentsTeam.map((pokemon) => pokemonNameFilter(pokemon.ariaLabel))
          );
          setTeams([
            userTeam.map((pokemon) => pokemonNameFilter(pokemon.ariaLabel)),
            opponentsTeam.map((pokemon) =>
              pokemonNameFilter(pokemon.ariaLabel)
            ),
          ]);
        }
      } else if (mutation.type === "attributes") {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  }, []);
  useEffect(() => {
    console.log("messageLog", messageLog);
    const messageLogObserver = new MutationObserver(callback);
    messageLogObserver.observe(messageLog, config);
    return () => messageLogObserver.disconnect();
  }, []);
  // useEffect(() => {
  //   setActivePokemon(getCurrentPokemon(team));
  // }, [team]);
  // // swaps displayed pokemon between selected and active
  // // such that when active is displayed it will automatically
  // // chaange if the active pokemon is changed but continues
  // // displaying the selected pokemon is user selects a
  // // different pokemon
  // useEffect(() => {
  //   if (selectedPokemon === null) {
  //     if (activePokemon) {
  //       setDisplayedPokemon(getPokemonName(activePokemon));
  //     }
  //   } else if (selectedPokemon === activePokemon) {
  //     setSelectedPokemon(null);
  //   } else {
  //     setDisplayedPokemon(selectedPokemon);
  //   }
  // }, [selectedPokemon, activePokemon]);

  return !teams ? (
    <ButtonDisplay>
      <SpriteImage name={pokemonNameFilter("")} />
      <SpriteImage name={pokemonNameFilter("")} />
      <SpriteImage name={pokemonNameFilter("")} />
      <SpriteImage name={pokemonNameFilter("")} />
      <SpriteImage name={pokemonNameFilter("")} />
      <SpriteImage name={pokemonNameFilter("")} />
    </ButtonDisplay>
  ) : (
    <>
      <ButtonDisplay>
        {teams[Number(opponentsTeam)].map((x, idx) => (
          <Button
            key={pokemonNameFilter(x) + idx}
            onClick={() => {
              setDisplayedPokemon(getPokemonName(x));
            }}
          >
            <SpriteImage name={pokemonNameFilter(x)} />
          </Button>
        ))}
      </ButtonDisplay>

      {displayedPokemon ? (
        <PokemonDataDisplay
          pokemon={displayedPokemon}
          isRandomBattle={isRandomBattle}
        />
      ) : (
        <PokemonUnavailable />
      )}
    </>
  );
};
// !team ? (
// <>
//   <OpponentsTeamUnavailable />
// </>;
// ) : (
// );
