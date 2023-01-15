import React, { useEffect, useState } from "react";
import { DamageContainer } from "./DamageDisplay.styles";
import { damageCalculator } from "../../functions";
import { LoadingScreen } from "../LoadingScreen";
import { TypeName, TypeNamesArr } from "../../types";
import EffectivnessDisplay from "../EffectivnessDisplay/EffectivnessDisplay";

type DamageObj = {
  [Type in TypeName]: number;
};
interface EffectObj {
  0: TypeName[];
  0.25: TypeName[];
  0.5: TypeName[];
  2: TypeName[];
  4: TypeName[];
}
interface DamageDisplayProps {
  typesArray: TypeName[] | null;
}
const DamageDisplay: React.FC<DamageDisplayProps> = ({ typesArray }) => {
  const [effectObj, setEffectObj] = useState<EffectObj>({
    0: [],
    0.25: [],
    0.5: [],
    2: [],
    4: [],
  });
  useEffect(() => {
    if (typesArray) {
      const damageObj: DamageObj = damageCalculator(typesArray);
      let effect: EffectObj = {
        0: [],
        0.25: [],
        0.5: [],
        2: [],
        4: [],
      };
      TypeNamesArr.forEach((x) => {
        if (damageObj) {
          if (damageObj[x] === 0) {
            effect[0].push(x);
          } else if (damageObj[x] === 0.25) {
            effect[0.25].push(x);
          } else if (damageObj[x] === 0.5) {
            effect[0.5].push(x);
          } else if (damageObj[x] === 2) {
            effect[2].push(x);
          } else if (damageObj[x] === 4) {
            effect[4].push(x);
          }
        }
      });
      setEffectObj(effect);
    }
  }, [typesArray]);

  return (
    <DamageContainer>
      {effectObj ? (
        <>
          <EffectivnessDisplay damage={"0"} effectivenessArray={effectObj[0]} />
          <EffectivnessDisplay damage={"¼"} effectivenessArray={effectObj[0.25]} />
          <EffectivnessDisplay damage={"½"} effectivenessArray={effectObj[0.5]} />
          <EffectivnessDisplay damage={"2"} effectivenessArray={effectObj[2]} />
          <EffectivnessDisplay damage={"4"} effectivenessArray={effectObj[4]} />
        </>
      ) : (
        <LoadingScreen />
      )}
    </DamageContainer>
  );
};

export default DamageDisplay;
