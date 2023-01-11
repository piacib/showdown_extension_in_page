import { TypeName } from "../../types";
import React from "react";
import { Type, TypeContainer } from "./TypesDisplay.style";

interface TypesDisplayProps {
  types: TypeName[] | null;
}
const TypesDisplay: React.FC<TypesDisplayProps> = ({ types }) => {
  if (!types) {
    return <></>;
  }
  return (
    <TypeContainer types={types.length}>
      {types.map((x) => (
        <Type key={x} background={x}>
          {x}
        </Type>
      ))}
    </TypeContainer>
  );
};

export default TypesDisplay;
