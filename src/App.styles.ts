import styled from "styled-components";
import { PropertyDisplay } from "./components/PokemonDataDisplay/DataDisplay.style";
export const RefreshButton = styled.button`
  grid-column: 3/4;
  background-color: transparent;
  grid-row: 1;
  border: none;
  position: relative;
  justify-self: end;
  align-self: center;
  border-radius: 50%;
  width: 4em;
  height: 4em;
`;
export const Refresh = styled.img`
  width: 100%;
`;
export const Button = styled.button`
  --height: 40px
  width: 200px;
  border: none;
  height: var(--height);
  line-height: var(--height);
  white-space: 0;
  grid-row: 1;
  grid-column: 2;
  border-radius: 20px;
  justify-self: center;
  background-color: rgb(237, 85, 100);
  align-self: center;
`;
interface RefProp {
  ref?: React.RefObject<HTMLDivElement>;
  changeDisplay: boolean;
}
export const AppDisplay = styled.div<RefProp>`
  width: 100%;
  min-width: 100px;
  padding: 36px 8px 0;
  display: ${(props) => (props.changeDisplay ? "flex" : "grid")};
  min-height: 250px;
  height: 30%;
  flex-direction: column;
`;
