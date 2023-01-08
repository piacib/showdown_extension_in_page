import React, { useEffect, useState } from "react";
import { PokemonData, isRandomBattleReturn } from "../../types";
import { Dex } from "@pkmn/dex";
import { dexSearchPrepper } from "../../functions";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";
import MovesDisplay from "../MovesDisplay/MovesDisplay";
import AbilitiesDisplay from "../AbilitiesDisplay/AbilitiesDisplay";
import { devPathname, isDevelopmentMode } from "../../developmentMode";
import RolesDisplay from "../RolesDisplay/RolesDisplay";
const { Moves } = Dex.data;
const emptyRandbatsPokemonData = {
  "": {
    level: 0,
    abilities: [],
    items: [],
    moves: [],
  },
};
const getBattleType = () => {
  const pathname = !isDevelopmentMode ? document.location.pathname : devPathname;
  const regMatch = pathname.match(/(?<=\-).+?(?=\-)/);
  return regMatch ? regMatch[0] : "";
};
export const getMoves = (moveData: string[] | undefined) => {
  if (moveData) {
    return moveData.map((move) => Moves[dexSearchPrepper(move)]);
  }
  return [];
};
const getRoles = (pokemonData: RandomBattlePokemonData) => {};

interface RandomBattlePokemonData extends PokemonData {
  level: number;
}
interface RandomBattleData {
  [key: string]: RandomBattlePokemonData;
}
const useRandomBattleData = (): [
  RandomBattleData,
  React.Dispatch<React.SetStateAction<RandomBattleData>>
] => {
  const [randbatsPokemonData, setRandbatsPokemonData] =
    useState<RandomBattleData>(emptyRandbatsPokemonData);
  // fetchs random pokemon data only on startup
  useEffect(() => {
    async function asyncFetchRandomPokemonData() {
      const battleType = getBattleType();
      console.log(`https://pkmn.github.io/randbats/data/${battleType}.json`);
      const fetchData = await fetch(`https://pkmn.github.io/randbats/data/${battleType}.json`);
      const response = await fetchData.json();
      setRandbatsPokemonData(response);
    }
    asyncFetchRandomPokemonData();
  }, []);
  // sets pokemon data when new pokemon is selected
  return [randbatsPokemonData, setRandbatsPokemonData];
};

interface RandomBattlePokemonDisplayProps {
  pokemon: string;
  isGen9?: boolean;
}
const RandomBattlePokemonDisplay: React.FC<RandomBattlePokemonDisplayProps> = ({
  pokemon,
  isGen9 = false,
}) => {
  // console.log("rndbattle loading", pokemon);
  const [randbatsPokemonData] = useRandomBattleData();
  const pokemonName = pokemon[0].toUpperCase() + pokemon.slice(1);
  if (Object.keys(randbatsPokemonData).length > 1 && !randbatsPokemonData[pokemonName]) {
    console.error("no data for this pokemon", randbatsPokemonData, pokemonName, pokemon);
  }
  const movesData = getMoves(randbatsPokemonData[pokemonName]?.moves);
  const rolesData = randbatsPokemonData[pokemonName]?.roles;
  return randbatsPokemonData[pokemonName] ? (
    <>
      {rolesData ? (
        <RolesDisplay pokemonData={rolesData} initialRole={Object.keys(rolesData)[0]} />
      ) : (
        <>
          <AbilitiesDisplay abilities={randbatsPokemonData[pokemonName].abilities} />
          <ItemsDisplay items={randbatsPokemonData[pokemonName].items} />
          <MovesDisplay movesData={movesData} />
        </>
      )}
    </>
  ) : (
    <></>
  );
};
export default RandomBattlePokemonDisplay;
