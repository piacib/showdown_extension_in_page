import React, { useEffect, useState } from "react";
import { PokemonData, isRandomBattleReturn } from "../../types";
import { Dex } from "@pkmn/dex";
import { dexSearchPrepper } from "../../functions";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";
import MovesDisplay from "../MovesDisplay/MovesDisplay";
import AbilitiesDisplay from "../AbilitiesDisplay/AbilitiesDisplay";
import { devPathname, isDevelopmentMode } from "../../developmentMode";
const { Moves } = Dex.data;
const useRandomBattleData = (): [
  RandbatsPokemonData,
  React.Dispatch<React.SetStateAction<RandbatsPokemonData>>
] => {
  const [randbatsPokemonData, setRandbatsPokemonData] = useState<RandbatsPokemonData>({
    "": {
      level: 0,
      abilities: [],
      items: [],
      moves: [],
    },
  });
  // fetchs random pokemon data only on startup
  useEffect(() => {
    async function asyncFetchRandomPokemonData() {
      const pathname = !isDevelopmentMode ? document.location.pathname : devPathname;
      const regMatch = pathname.match(/(?<=\-).+?(?=\-)/);
      const battleType = regMatch ? regMatch[0] : "";
      console.log("battleType", battleType);
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

type RandbatsPokemonData = {
  [key: string]: {
    level: Number;
    abilities: string[];
    items: string[];
    moves: string[];
  };
};
interface RandomBattlePokemonDisplayProps {
  pokemon: string;
}
const RandomBattlePokemonDisplay: React.FC<RandomBattlePokemonDisplayProps> = ({
  pokemon,
}) => {
  console.log("rndbattle loading", pokemon);
  const [randbatsPokemonData, setRandbatsPokemonData] = useRandomBattleData();
  const pokemonName = pokemon[0].toUpperCase() + pokemon.slice(1);
  if (Object.keys(randbatsPokemonData).length > 1 && !randbatsPokemonData[pokemonName]) {
    console.error("no data for this pokemon", randbatsPokemonData, pokemonName, pokemon);
  }
  const movesData = randbatsPokemonData[pokemonName]?.moves.map(
    (move) => Moves[dexSearchPrepper(move)]
  );
  return randbatsPokemonData[pokemonName] ? (
    <>
      <AbilitiesDisplay abilities={randbatsPokemonData[pokemonName].abilities} />
      <ItemsDisplay items={randbatsPokemonData[pokemonName].items} />
      <MovesDisplay moves={movesData} />
    </>
  ) : (
    <></>
  );
};
export default RandomBattlePokemonDisplay