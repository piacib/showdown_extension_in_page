import styled from "styled-components";
export const PropertyDisplay = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  padding-left: 1.8rem;
`;
export const HiddenPropertyText = styled.div`
  display: none;
`;
export const HoverDisplay = styled.div`
  padding: ${(props) => props.theme.padding.medium};
  text-align: center;
  margin: 2px;
  border: 2px solid black;
  font-size: 0.8rem;
  /* position: relative; */
  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    text-align: start;
    background: white;
    z-index: 2;
    border: 1px solid black;
  }
`;
export const PropertyBtn = styled(HoverDisplay)`
  &:hover ${HiddenPropertyText} {
    /* bottom: 2rem; */
    left: 0;
    margin-right: 10px;
    max-width: 250px;
    min-width: 150px;
    padding: ${(props) => props.theme.padding.medium};
    font-size: inherit;
  }
`;
export const PokemonName = styled.a`
  align-self: center;
  grid-row: 3;
  grid-column: 1/2;
  font-size: 1.8rem;
  max-width: 11rem;
  overflow: hidden;
`;
export const PropertiesContainer = styled.div`
  grid-row: 4;
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const HeaderContainer = styled.div`
  grid-area: 3/1;
  display: flex;
  justify-content: space-between;
`;
