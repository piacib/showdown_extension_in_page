import { isRandomBattleReturn } from "./types";
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
  return randomDataBattleTypes.includes(battleType[0])
    ? battleType[0]
    : "Not a random battle";
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
