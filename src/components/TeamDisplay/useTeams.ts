import { useState } from "react";
import { getTeam, pokemonNameFilter } from "./TeamDisplay.functions";

/** [usersTeam[''],opponentsTeam['']] | null */
type teamsType = [string[], string[]] | null;
type setTeamsType = (roomId: string, props?: [string[], string[]]) => void;

/** teamsType: [usersTeam[''],opponentsTeam['']] | null */
export const useTeams = (): [teamsType, setTeamsType] => {
  const [teams, setTeamstemp] = useState<[string[], string[]] | null>(null);
  const setTeams = (roomId: string, props?: [string[], string[]]) => {
    console.log("setTeams props", roomId, props);
    if (props) {
      setTeamstemp(props);
      return;
    }
    const [usersTeam, opponentsTeam] = getTeam(roomId);
    if (usersTeam.length === 0 || opponentsTeam.length === 0) {
      setTeamstemp(null);
    }
    setTeamstemp([
      usersTeam.map((pokemon) => pokemonNameFilter(pokemon.ariaLabel)),
      opponentsTeam.map((pokemon) => pokemonNameFilter(pokemon.ariaLabel)),
    ]);
  };
  return [teams, setTeams];
};
