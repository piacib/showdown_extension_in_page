import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";

import "./locationChange.js";
import FontStyles from "./FontStyles";
import { GlobalStyles } from "./GlobalStyles";
import { observerConfig, getBattleRoomID, createContainer } from "./functions";
import { devRoomId, isDevelopmentMode } from "./developmentMode";
console.log("isDevelopmentMode", isDevelopmentMode);
if (isDevelopmentMode) {
  const root = createRoot(document.body as HTMLElement);
  console.log("root", root);
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <FontStyles />
      <ThemeProvider theme={theme}>
        <App roomId={devRoomId} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

const addDisplay = (battleRoom: HTMLElement) => {
  console.log("adding display", battleRoom);
  if (!battleRoom) {
    // not in battle, return early
    return;
  }
  /** room-battle-${string}-${number} */
  const roomId: string = battleRoom.id;
  if (!roomId.startsWith("room-battle")) {
    return;
  }
  const container = createContainer(roomId, battleRoom);
  const root = createRoot(container!);
  root.render(
    <>
      <FontStyles />
      <ThemeProvider theme={theme}>
        <App roomId={battleRoom.id} />
      </ThemeProvider>
    </>
  );
};
let activeBattleRooms: string[] = [];
const resetBattleRooms = () => {
  console.log("resetting");
  const innerUlQuery = document.querySelector("#header > div.tabbar.maintabbar > div");
  if (innerUlQuery?.childElementCount === 2) {
    // no active battles exist and array should be cleared
    activeBattleRooms = [];
  }
  const battlesUl = innerUlQuery?.children[1];
  if (!battlesUl) {
    return;
  }
  const battleLi = Array.from(battlesUl.children);
  const activeBattles: string[] = [];
  battleLi.forEach((li) => {
    const anchorEl = li.children[0];
    if (anchorEl instanceof HTMLAnchorElement && anchorEl.href.includes("battle")) {
      activeBattles.push(getBattleRoomID(anchorEl.href));
    }
  });
  activeBattleRooms = activeBattles;
};
const checkBattleRooms = (roomId: string) => {
  if (activeBattleRooms.includes(roomId)) {
    return false;
  }
  activeBattleRooms.push(roomId);
  const battleRoom = document.getElementById("room-" + document.location.pathname.slice(1));
  if (battleRoom) {
    addDisplay(battleRoom);
  }
  return true;
};
// // checks for tab changes
// let activeBattleRooms: string[] = [];
window.addEventListener("load", () => {
  let currentPathname = document.location.pathname;
  let body = document.querySelector("body");
  // checks mutations for a different pathname
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (currentPathname != document.location.pathname) {
        console.log("pathchanged", getBattleRoomID(document.location.pathname));
        currentPathname = document.location.pathname;
        const roomId = getBattleRoomID(document.location.pathname);
        if (roomId) {
          checkBattleRooms(roomId);
          // console.log("battleRooms", activeBattleRooms);
        } else {
          resetBattleRooms();
        }
      }
    });
  });
  if (body) {
    console.log("load observer added");
    observer.observe(body, observerConfig);
  }
});
