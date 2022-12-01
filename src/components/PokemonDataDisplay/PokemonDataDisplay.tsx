import React, { useEffect, useState } from "react";
import { isRandomBattleReturn, isTypeName, TypeName } from "../../types";
import { dexSearchPrepper } from "../../functions";
import { PropertiesContainer, PokemonName, HeaderContainer } from "./DataDisplay.style";
import DamageDisplay from "../DamageDisplay/DamageDisplay";
import TypeDisplay from "../TypesDisplay/TypesDisplay";
import StatsDisplay from "../StatsDisplay/StatsDisplay";
import OtherFormatsDisplay from "./OtherFormatsDisplay";
import { Dex } from "@pkmn/dex";
import useResizeObserver from "use-resize-observer";
import { AppProps } from "../../App";
import RandomBattlePokemonDisplay from "./RandomBattlePokemonDisplay";

const { Species } = Dex.data;

interface PokemonDataDisplayProps extends AppProps {
  pokemon: string;
}
const displayCutOff = 300;
const PokemonDataDisplay = ({ pokemon, roomId }: PokemonDataDisplayProps) => {
  console.log("PokemonDataDisplay", pokemon, roomId);
  const [typesArray, setTypesArray] = useState<TypeName[] | null>(null);
  const [changeDisplay, setChangeDisplay] = useState<boolean>(false);
  const { ref, width, height } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width, height }) => {
      if (!width || !height) {
        return;
      }
      if (width < displayCutOff && !changeDisplay) {
        setChangeDisplay(true);
      }
      if (width > displayCutOff && changeDisplay) {
        setChangeDisplay(false);
      }
    },
  });
  const isRandomBattle = roomId.includes("random");
  useEffect(() => {
    if (Dex.species.get(pokemon).exists) {
      let newArr: TypeName[] = [];
      const TypeArr = Species[dexSearchPrepper(pokemon)]?.types;
      if (!TypeArr) {
        console.error("error retrieving type", dexSearchPrepper(pokemon), pokemon);
      }
      TypeArr.forEach((entry) => {
        if (isTypeName(entry)) {
          newArr.push(entry);
        }
      });
      setTypesArray(newArr);
    }
  }, [pokemon]);
  const regExPokemonName = pokemon.match(/^([\w]+)-/);
  return (
    <>
      <HeaderContainer ref={ref} changeDisplay={changeDisplay}>
        <PokemonName href={`https://www.smogon.com/dex/ss/pokemon/${pokemon}/`}>
          {regExPokemonName ? regExPokemonName[1] : pokemon}
        </PokemonName>
        <TypeDisplay types={typesArray} />
      </HeaderContainer>
      <DamageDisplay typesArray={typesArray} />
      <PropertiesContainer>
        {isRandomBattle ? (
          <RandomBattlePokemonDisplay pokemon={pokemon} />
        ) : (
          <OtherFormatsDisplay pokemon={pokemon} />
        )}
      </PropertiesContainer>
      <StatsDisplay pokemon={pokemon} />
    </>
  );
};
export default PokemonDataDisplay;
