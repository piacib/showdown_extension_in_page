import { useState } from "react";
import { getTeam, pokemonNameFilter } from "./TeamDisplay.functions";
/** [usersTeam[''],opponentsTeam['']] | null */
type teamsType = [string[], string[]];
type setTeamsType = (roomId: string, props?: [string[], string[]]) => void;

const notRevealedTeam: teamsType = [
  ["Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed"],
  ["Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed"],
];
/** teamsType: [usersTeam[''],opponentsTeam['']] | null */
export const useTeams = (): [teamsType, setTeamsType] => {
  const [teams, setTeamstemp] = useState<teamsType>(notRevealedTeam);
  const setTeams = (roomId: string, props?: [string[], string[]]) => {
    console.log("setTeams props", roomId, props);
    if (props) {
      setTeamstemp(props);
      return;
    }
    const [usersTeam, opponentsTeam] = getTeam(roomId);
    if (usersTeam.length === 0 || opponentsTeam.length === 0) {
      setTeamstemp(notRevealedTeam);
    }
    setTeamstemp([
      usersTeam.map((pokemon) => pokemonNameFilter(pokemon.ariaLabel)),
      opponentsTeam.map((pokemon) => pokemonNameFilter(pokemon.ariaLabel)),
    ]);
  };
  return [teams, setTeams];
};
