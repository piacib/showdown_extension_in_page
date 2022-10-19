import React from "react";
import { render, screen } from "@testing-library/react";
import DamageDisplay from "./DamageDisplay";
import { TypeNamesArr } from "../../types";
test("renders learn react link", () => {
  render(<DamageDisplay typesArray={[TypeNamesArr[3], TypeNamesArr[5]]} />);
});
