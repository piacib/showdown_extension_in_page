import React, { Dispatch, useCallback, useEffect, useState } from "react";
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
  config,
  getTeam,
} from "./TeamDisplay.functions";
import { PokemonDataDisplay } from "../PokemonDataDisplay/PokemonDataDisplay";
import { PokemonUnavailable } from "../ErrorScreens/PokemonUnavailable";
import { isDevelopmentMode } from "../../functions";
import { stringify } from "querystring";
import { AppProps } from "../../App";
interface TeamProps extends AppProps {
  opponentsTeam: boolean;
}
/** [usersTeam[''],opponentsTeam['']] | null */
type teamsType = [string[], string[]] | null;
type setTeamsType = (roomId: string) => void;

/** teamsType: [usersTeam[''],opponentsTeam['']] | null */
const useTeams = (): [teamsType, setTeamsType] => {
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
// Callback function to execute when mutations are observed
// WORKS

//fetches latest pokemon data from auto updating github dataset
export const TeamDisplay = ({ opponentsTeam, roomId }: TeamProps) => {
  console.log("inside team dis");
  const [teams, setTeams] = useTeams();
  const [displayedPokemon, setDisplayedPokemon] = useState<string | null>(null);
  const [messageLogAdded, setMessageLogAdded] = useState<boolean>(false);

  const [battleRoom, setBattleRoom] = useState("");
  console.log("roomId", roomId);
  useEffect(() => {
    if (teams) {
      console.log("chagning pkmdis");
      const displayedTeam = teams[Number(opponentsTeam)];
      setDisplayedPokemon(displayedTeam[0]);
    }
  }, [teams, opponentsTeam]);
  useEffect(() => {
    window.addEventListener("load", () => {
      let bodyList = document.querySelector("body");
      // checks mutations for a different pathname
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (battleRoom != document.location.pathname) {
            console.log(
              "app mutation, setting battleroom",
              document.location.pathname
            );
            console.log("roomId", roomId);
            setBattleRoom(document.location.pathname);
          }
        });
      });
      if (bodyList) {
        observer.observe(bodyList, config);
      }
    });
  }, []);

  const initialLoadCallback = useCallback((mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      const target = mutation.target;
      if (mutation.target instanceof HTMLDivElement) {
        mutation.target.className === "inner message-log";
        setMessageLogAdded(true);
        console.log("message log found", mutationList);
      }
    }
  }, []);
  const battleRoomEl = document.getElementById(roomId);
  console.log("team", battleRoomEl, roomId);
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

  // if message log added add message log observer
  // to watch for new turns

  useEffect(() => {
    const messageLog =
      battleRoomEl?.getElementsByClassName("inner message-log")[0];
    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          if (mutation.addedNodes[0]?.nodeName === "H2") {
            console.log(
              mutation.addedNodes[0] instanceof HTMLElement
                ? mutation.addedNodes[0].innerText
                : "H2"
            );
            console.log("setting teams");
            setTeams(roomId);
          }
        } else if (mutation.type === "attributes") {
          console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
      }
    };
    const messageLogObserver = new MutationObserver(callback);
    if (messageLogAdded) {
      console.log(
        "bodyObserver.disconnect(), setTeams(), messageLogObserver.observe",
        messageLog
      );
      bodyObserver.disconnect();
      if (messageLog) {
        console.log("messageLogObserver");
        setTeams(roomId);
        messageLogObserver.observe(messageLog, config);
      }
    }
    return () => messageLogObserver.disconnect();
  }, [messageLogAdded]);
  console.log(teams, displayedPokemon);
  return teams ? (
    <>
      <ButtonDisplay>
        {teams[Number(opponentsTeam)].map((x, idx) => (
          <Button
            key={pokemonNameFilter(x) + idx}
            onClick={() => {
              console.log("pokemon clicked", x, getPokemonName(x));
              setDisplayedPokemon(getPokemonName(x));
            }}
          >
            <SpriteImage name={pokemonNameFilter(x)} />
          </Button>
        ))}
      </ButtonDisplay>

      {displayedPokemon ? (
        <PokemonDataDisplay pokemon={displayedPokemon} roomId={roomId} />
      ) : (
        <PokemonUnavailable />
      )}
    </>
  ) : (
    <ButtonDisplay>
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
      <SpriteImage name={""} />
    </ButtonDisplay>
  );
};
