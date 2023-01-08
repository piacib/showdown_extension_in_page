import React, { useEffect, useState } from "react";
import { PropertyDisplay } from "../PokemonDataDisplay/DataDisplay.style";
import { RolesBtn } from "./RolesDisplay.style";
import AbilitiesDisplay from "../AbilitiesDisplay/AbilitiesDisplay";
import ItemsDisplay from "../ItemsDisplay/ItemsDisplay";
import MovesDisplay from "../MovesDisplay/MovesDisplay";
import { RolesData } from "../../types";
import { getMoves } from "../PokemonDataDisplay/RandomBattlePokemonDisplay";
import { TypeBox } from "../EffectivnessDisplay/EffectivnessDisplay.style";
interface RolesDisplayProps {
  pokemonData: RolesData;
  initialRole: string;
}
const RolesDisplay: React.FC<RolesDisplayProps> = ({ pokemonData, initialRole }) => {
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    setRole(Object.keys(pokemonData)[0]);
  }, [pokemonData]);
  return (
    <>
      <PropertyDisplay>
        <h3>Roles:</h3>
        {Object.keys(pokemonData).map((role) => (
          <RolesBtn onClick={() => setRole(role)} key={role}>
            {role}
          </RolesBtn>
        ))}
      </PropertyDisplay>
      {pokemonData[role] && (
        <>
          <PropertyDisplay>
            TeraTypes:
            {pokemonData[role].teraTypes.map((x) => (
              <TypeBox background={x}>{x}</TypeBox>
            ))}
          </PropertyDisplay>
          <AbilitiesDisplay abilities={pokemonData[role].abilities} />
          <ItemsDisplay items={pokemonData[role].items} />
          <MovesDisplay movesData={getMoves(pokemonData[role].moves)} />
        </>
      )}
    </>
  );
};

export default RolesDisplay;
