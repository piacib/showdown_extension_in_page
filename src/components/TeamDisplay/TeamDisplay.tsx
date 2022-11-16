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
} from "./TeamDisplay.functions";
import { PokemonDataDisplay } from "../PokemonDataDisplay/PokemonDataDisplay";
import { PokemonUnavailable } from "../ErrorScreens/PokemonUnavailable";
import { isDevelopmentMode, testTeam } from "../../developmentMode";
import { AppProps } from "../../App";
import { useTeams } from "./useTeams";
import { isRandomBattle } from "../../functions";
interface TeamProps extends AppProps {
  opponentsTeam: boolean;
}
//fetches latest pokemon data from auto updating github dataset
export const TeamDisplay = ({ opponentsTeam, roomId }: TeamProps) => {
  console.log("TeamDisplay", opponentsTeam, roomId);
  const [teams, setTeams] = useTeams();
  const [displayedPokemon, setDisplayedPokemon] = useState<string | null>(null);
  const [messageLogAdded, setMessageLogAdded] = useState<boolean>(false);

  const [battleRoom, setBattleRoom] = useState("");
  useEffect(() => {
    if (isDevelopmentMode) {
      console.log("devmode team");
      setTeams(roomId, [testTeam, testTeam]);
    }
  }, []);
  useEffect(() => {
    if (teams && !displayedPokemon) {
      console.log("chagning pkmdis");
      const displayedTeam = teams[Number(opponentsTeam)];
      setDisplayedPokemon(displayedTeam[0]);
    }
  }, [teams, opponentsTeam]);

  // relic of an older time
  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     let bodyList = document.querySelector("body");
  //     // checks mutations for a different pathname
  //     const observer = new MutationObserver(function (mutations) {
  //       mutations.forEach(function (mutation) {
  //         if (battleRoom != document.location.pathname) {
  //           console.log(
  //             "app mutation, setting battleroom",
  //             document.location.pathname
  //           );
  //           console.log("roomId", roomId);
  //           setBattleRoom(document.location.pathname);
  //         }
  //       });
  //     });
  //     if (bodyList) {
  //       observer.observe(bodyList, config);
  //     }
  //   });
  // }, []);

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
  console.log("team, battleRoomEl, roomId", battleRoomEl, roomId);
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
      console.log("bodyObserver.disconnect(), setTeams(), messageLogObserver.observe", messageLog);
      bodyObserver.disconnect();
      if (messageLog) {
        console.log("messageLogObserver");
        setTeams(roomId);
        messageLogObserver.observe(messageLog, config);
        if (!isRandomBattle(roomId)) {
          setTeams(roomId);
        }
      }
    }
    return () => messageLogObserver.disconnect();
  }, [messageLogAdded]);

  console.log("teams", teams, displayedPokemon);
  return teams && teams[0] ? (
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
