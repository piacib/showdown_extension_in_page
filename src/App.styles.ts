import styled from "styled-components";
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
  width: 200px;
  border: none;
  height: 40px;
  white-space: 0;
  grid-row: 1;
  grid-column: 2;
  border-radius: 20px;
  font-size: inherit;
  justify-self: center;
  background-color: rgb(237, 85, 100);
  align-self: center;
`;
export const AppDisplay = styled.div`
  width: 100%;
  min-width: 100px;
  /* height: 100%; */
  /* max-width: 640px; */
  min-height: 250px;
  height: 30%;
 
`;
