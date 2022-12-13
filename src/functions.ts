import { TypeName, isRandomBattleReturn } from "./types";
import { Dex } from "@pkmn/dex";

const randomDataBattleTypes = [
  "gen8randombattle",
  "gen8randomdoublesbattle",
  "gen8randombattlenodmax",
  "gen7randombattle",
  "gen7randomdoublesbattle",
  "gen7letsgorandombattle",
  "gen6randombattle",
  "gen5randombattle",
  "gen4randombattle",
  "gen3randombattle",
  "gen2randombattle",
  "gen1randombattle",
];

export const getBattleType = (url: string) => {
  const battleType = url.match(/(?<=-).+?(?=-)/g);
  if (!battleType) {
    return "No Battle Type Found";
  }
  return randomDataBattleTypes.includes(battleType[0]) ? battleType[0] : "Not a random battle";
};
export const isRandomBattle = (url: string): isRandomBattleReturn => {
  const battleType = url.match(/(?<=-).+?(?=-)/g);
  if (!battleType) {
    return null;
  }
  return randomDataBattleTypes.includes(battleType[0]) ? battleType[0] : false;
};
export const dexSearchPrepper = (str: string): string => {
  return str.toLowerCase().replace(/\W+/g, "");
};
export const isURLShowdown = (url: string) => {
  return url.includes("play.pokemonshowdown.com");
};
const moveFetchPrepper = (move: string) => {
  return move.replace(" ", "-").toLowerCase();
};
interface MoveResponse {
  move: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
}
export const getMoveData = (data: string[] | null) => {
  const dataSet: Array<MoveResponse> = [];
  if (data) {
    data.map((move: string) =>
      fetch(`https://pokeapi.co/api/v2/move/${moveFetchPrepper(move)}`)
        .then((resp) => resp.json())
        .then((json) =>
          dataSet.push({
            move: json.name,
            type: json.type.name,
            category: json.damage_class.name,
            power: json.power,
            accuracy: json.accuracy,
          })
        )
    );
  }
  return dataSet;
};

type TypeColorObjType = {
  [Type in TypeName]: string;
};
export const typeColorConverter: TypeColorObjType = {
  Normal: "rgb(168, 167, 120)",
  Ground: "rgb(224, 192, 104)",
  Rock: "rgb(163, 140, 33)",
  Bug: "rgb(114, 159, 62)",
  Ghost: "rgb(123, 98, 163)",
  Steel: "rgb(158, 183, 184)",
  Fighting: "rgb(192, 48, 40)",
  Fire: "rgb(247, 125, 37)",
  Flying: "rgb(168, 143, 239)",
  Water: "rgb(69, 146, 196)",
  Poison: "rgb(185, 127, 201)",
  Grass: "rgb(155, 204, 80)",
  Electric: "rgb(248, 208, 48)",
  Psychic: "rgb(243, 102, 185)",
  Ice: "rgb(152, 216, 216)",
  Dragon: "rgb(112, 56, 248)",
  Dark: "rgb(112, 88, 72)",
  Fairy: "rgb(238, 153, 172)",
  "???": "rgb(117, 117, 117)",
};
export const observerConfig = {
  childList: true,
  subtree: true,
};
export const getBattleRoomID = (pathname: string) => {
  // takes in string returns what follows the last "/"
  const regexMatch = pathname.match(/(?<=-)(?:.(?!-))+$/);
  if (regexMatch && regexMatch[0]) {
    return regexMatch[0];
  }
  return "";
};
export const createContainer = (roomId: string, battleRoom: HTMLElement) => {
  const appId = `react-root-${roomId}`;
  const rootEl = document.getElementById(appId);
  if (rootEl) {
    // element is already added, return early
    return;
  }
  const app = document.createElement("div");
  app.id = appId;
  const battleLog = battleRoom.getElementsByClassName("battle-log");
  if (battleLog && battleLog[0]) {
    battleLog[0].prepend(app);
  }
  return document.getElementById(appId);
};

const Types = Dex.data.Types;
const damageAdjustor = (objectEntries: [string, number]): [string, number] => {
  if (!objectEntries[1]) {
    return [objectEntries[0], 1];
  }
  return [objectEntries[0], Math.abs((objectEntries[1] - 3) / -objectEntries[1])];
};

// creates damage obj from arr of entries in type.damageTaken object
const damageCalculatorOneType = (type: TypeName) => {
  const damageTaken = Object.entries(Types[type.toLowerCase()].damageTaken);
  const damageConverted = damageTaken.map((x) => damageAdjustor(x));
  return Object.fromEntries(damageConverted);
};

export const damageCalculator = (typesArray: TypeName[]) => {
  if (typesArray.length === 1) {
    return damageCalculatorOneType(typesArray[0]);
  }
  const type1 = damageCalculatorOneType(typesArray[0]);
  const type2 = damageCalculatorOneType(typesArray[1]);
  const types = Object.keys(type1);
  const damageObjectEntries = types.map((type) => [type, type1[type] * type2[type]]);
  return Object.fromEntries(damageObjectEntries);
};
