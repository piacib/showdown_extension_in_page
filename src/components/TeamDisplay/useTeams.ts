import { useCallback, useEffect, useState } from "react";
import { isDevelopmentMode, testTeam } from "../../developmentMode";
import { isRandomBattle } from "../../functions";
import { config, getTeam, pokemonNameFilter } from "./TeamDisplay.functions";
/** [usersTeam[''],opponentsTeam['']] | null */
type teamsType = [string[], string[]];
type setTeamsType = (roomId: string, props?: [string[], string[]]) => void;

const notRevealedTeam: teamsType = [
  ["Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed"],
  ["Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed", "Not revealed"],
];
/** teamsType: [usersTeam[''],opponentsTeam['']] | null */
export const useTeams = (roomId: string): [teamsType, setTeamsType] => {
  const [teams, setTeamstemp] = useState<teamsType>(notRevealedTeam);
  const [messageLogAdded, setMessageLogAdded] = useState<boolean>(false);

  const initialLoadCallback = useCallback((mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      if (mutation.target instanceof HTMLDivElement) {
        if (mutation.target.className === "inner message-log") {
          setMessageLogAdded(true);
          console.log("message log found", mutationList);
        }
      }
    }
  }, []);
  const battleRoomEl = document.getElementById(roomId);
  const bodyObserver = new MutationObserver(initialLoadCallback);
  // checks if battleroom and messagelog are present and if not
  // adds body observer to see when they're added

  useEffect(() => {
    if (
      battleRoomEl &&
      battleRoomEl?.getElementsByClassName("inner message-log")[0] === undefined
    ) {
      console.log("adding body observer");
      bodyObserver.observe(document.body, config);
    } else {
      setMessageLogAdded(true);
    }
    return () => bodyObserver.disconnect();
  }, []);
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
  useEffect(() => {
    if (isDevelopmentMode) {
      console.log("setting devmode team");
      setTeams(roomId, testTeam);
    }
  }, [roomId]);
  // if message log added add message log observer
  // to watch for new turns

  useEffect(() => {
    const messageLog = battleRoomEl?.getElementsByClassName("inner message-log")[0];
    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList" && mutation.addedNodes[0]?.nodeName === "H2") {
          setTeams(roomId);
        }
      }
    };
    const messageLogObserver = new MutationObserver(callback);
    if (messageLogAdded) {
      bodyObserver.disconnect();
      if (messageLog) {
        setTeams(roomId);
        messageLogObserver.observe(messageLog, config);
        if (!isRandomBattle(roomId)) {
          setTeams(roomId);
        }
      }
    }
    return () => messageLogObserver.disconnect();
  }, [messageLogAdded]);
  return [teams, setTeams];
};
