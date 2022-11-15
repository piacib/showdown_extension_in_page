import React from "react";
import { TypeName, TypeNamesArr } from "../../types";
import { DamageGroupContainer, Effectivness, Type, TypeBox } from "./EffectivnessDisplay.style";

interface EffectivnessProps {
  damage: "0" | "¼" | "½" | "2" | "4";
  effectivenessArray: TypeName[];
}
const EffectivnessDisplay: React.FC<EffectivnessProps> = ({ damage, effectivenessArray }) => {
  return (
    <DamageGroupContainer>
      {effectivenessArray.length ? (
        <>
          {effectivenessArray.map((x) => (
            <TypeBox key={x} background={x}>
              <Type>{x}</Type>
              <Effectivness>
                {damage}
                <span>x</span>
              </Effectivness>
            </TypeBox>
          ))}
        </>
      ) : null}
    </DamageGroupContainer>
  );
};
export default EffectivnessDisplay;
