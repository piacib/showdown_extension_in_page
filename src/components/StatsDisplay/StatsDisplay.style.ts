import styled from "styled-components";
export const StatsContainer = styled.div`
  grid-row: 2/4;
  grid-column: 2/4;
  max-width: 18rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 1.2em;
  padding-left: 1.8rem;
  div {
    display: flex;
    flex-direction: row;
    /* @media screen {
      max-width: ${(props) => props.theme.media.smallScreen};
    }
     {
      flex-direction: column;
    }*/
  }
`;
export const StatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 0.4rem;
`;
export const StatName = styled.div``;
export const StatValue = styled.div``;
