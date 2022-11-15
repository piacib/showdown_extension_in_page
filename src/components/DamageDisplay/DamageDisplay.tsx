import React, { useEffect, useState } from "react";
import { DamageContainer } from "./DamageDisplay.styles";
import { damageCalculator } from "../../functions/damageFunctions";
import { LoadingScreen } from "../LoadingScreen";
import { TypeName, TypeNamesArr } from "../../types";
import EffectivnessDisplay from "../EffectivnessDisplay/EffectivnessDisplay";

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

interface DamageDisplayProps {
  typesArray: TypeName[] | null;
}
const DamageDisplay: React.FC<DamageDisplayProps> = ({ typesArray }) => {
  console.log("DamageDisplay", typesArray);
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
      <EffectivnessDisplay damage={"¼"} effectivenessArray={effect[0.25]} />
      <EffectivnessDisplay damage={"½"} effectivenessArray={effect[0.5]} />
      <EffectivnessDisplay damage={"2"} effectivenessArray={effect[2]} />
      <EffectivnessDisplay damage={"4"} effectivenessArray={effect[4]} />
    </DamageContainer>
  );
};

export default DamageDisplay;
