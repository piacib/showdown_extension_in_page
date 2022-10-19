import React, { useEffect, useState } from "react";
import {
  DamageContainer,
  DamageGroupContainer,
  TypeBox,
  TypeBoxContainer,
} from "./DamageDisplay.styles";
import { damageCalculator } from "../../functions/damageFunctions";
import { LoadingScreen } from "../LoadingScreen";
import { TypeName, TypeNamesArr } from "../../types";

type DamageObj = {
  [Type in TypeName]: number;
  // Bug: number;
  // Dark: number;
  // Dragon: number;
  // Electric: number;
  // Fairy: number;
  // Fighting: number;
  // Fire: number;
  // Flying: number;
  // Ghost: number;
  // Grass: number;
  // Ground: number;
  // Ice: number;
  // Normal: number;
  // Poison: number;
  // Psychic: number;
  // Rock: number;
  // Steel: number;
  // Water: number;
};

interface EffectivnessProps {
  damage: "0" | "1/4" | "1/2" | "2" | "4";
  effectivenessArray: TypeName[];
}
const EffectivnessDisplay: React.FC<EffectivnessProps> = ({
  damage,
  effectivenessArray,
}) => {
  return (
    <DamageGroupContainer>
      {effectivenessArray.length ? (
        <>
          <TypeBoxContainer>
            x{damage}:
            {effectivenessArray.map((x) => (
              <TypeBox key={x} background={x}>
                {x}
              </TypeBox>
            ))}
          </TypeBoxContainer>
        </>
      ) : null}
    </DamageGroupContainer>
  );
};
interface DamageDisplayProps {
  typesArray: TypeName[] | null;
}
const DamageDisplay: React.FC<DamageDisplayProps> = ({ typesArray }) => {
  const [damageObj, setDamageObj] = useState<DamageObj | null>(null);
  useEffect(() => {
    if (typesArray) {
      setDamageObj(damageCalculator(typesArray));
    }
  }, [typesArray]);
  if (!damageObj) {
    return (
      <DamageContainer>
        <LoadingScreen />;
      </DamageContainer>
    );
  }
  const effect: {
    0: TypeName[];
    0.25: TypeName[];
    0.5: TypeName[];
    2: TypeName[];
    4: TypeName[];
  } = {
    0: [],
    0.25: [],
    0.5: [],
    2: [],
    4: [],
  };

  const keys = Object.keys(damageObj);
  TypeNamesArr.forEach((x) => {
    if (damageObj[x] == 0) {
      effect[0].push(x);
    } else if (damageObj[x] == 0.25) {
      effect[0.25].push(x);
    } else if (damageObj[x] == 0.5) {
      effect[0.5].push(x);
    } else if (damageObj[x] == 2) {
      effect[2].push(x);
    } else if (damageObj[x] == 4) {
      effect[4].push(x);
    }
  });

  return (
    <DamageContainer>
      <EffectivnessDisplay damage={"0"} effectivenessArray={effect[0]} />
      <EffectivnessDisplay damage={"1/4"} effectivenessArray={effect[0.25]} />
      <EffectivnessDisplay damage={"1/2"} effectivenessArray={effect[0.5]} />
      <EffectivnessDisplay damage={"2"} effectivenessArray={effect[2]} />
      <EffectivnessDisplay damage={"4"} effectivenessArray={effect[4]} />
    </DamageContainer>
  );
};

export default DamageDisplay;
