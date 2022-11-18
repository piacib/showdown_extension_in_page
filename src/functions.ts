import { TypeName, isRandomBattleReturn } from "./types";
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
