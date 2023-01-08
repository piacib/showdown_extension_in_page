import React, { useEffect, useState } from "react";
import { MovesContainer, MoveType } from "../MovesDisplay/MovesDisplay.style";
import { MoveData } from "@pkmn/dex";
import { HiddenPropertyText, PropertyBtn } from "../PokemonDataDisplay/DataDisplay.style";

interface PokemonDataGen9 {
  moves: string[];
  abilities: string[];
  items: string[];
  roles: {
    [key: string]: {
      moves: string[];
      teraTypes: string[];
    };
  };
}
const removeDuplicates = (arr: any[]) => {
  return [...new Set(arr)];
};
interface RolesDisplayProps {
  pokemonData: PokemonDataGen9;
}
const RolesDisplay: React.FC<RolesDisplayProps> = ({ pokemonData }) => {
  const [rolesData, setRolesData] = useState<MoveData[]>([]);
  const roles = pokemonData.roles;
  useEffect(() => {
    console.log("usee md");
    if (roles) {
    }

    return () => {};
  }, [pokemonData?.moves, pokemonData.roles]);
  console.log("roles", roles);
  return (
    <MovesContainer>
      <h3>Roles:</h3>
      {Object.keys(roles).map((role) => (
        <PropertyBtn key={role}>
          {role}
          <HiddenPropertyText>
            <p>teraTypes:</p>

            {roles[role].teraTypes.map((teraType) => (
              <MoveType background={teraType}>{teraType}</MoveType>
            ))}

            <p>moves: </p>
            {roles[role].moves.map((move) => (
              <></>
              // <MoveInfoPopUp move={move} />
            ))}
          </HiddenPropertyText>
        </PropertyBtn>
      ))}
    </MovesContainer>
  );
};

export default RolesDisplay;
