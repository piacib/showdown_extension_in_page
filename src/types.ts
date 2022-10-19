export enum Sender {
  React,
  Content,
}
export interface ChromeMessage {
  from: Sender;
  message: any;
}
export interface PokemonResponse {
  opponentsTeam: string[] | null;
  usersTeam: string[] | null;
}
export type isRandomBattleReturn = null | false | string;
export interface TypeColorInterface {
  background: TypeName;
}
export interface PokemonData {
  moves: string[];
  abilities: string[];
  items: string[];
}
export const TypeNamesArr = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
  "???",
] as const;
export type TypeTuple = typeof TypeNamesArr;
export type TypeName = TypeTuple[number];

export function isTypeName(value: string): value is TypeName {
  return TypeNamesArr.includes(value as TypeName);
}
