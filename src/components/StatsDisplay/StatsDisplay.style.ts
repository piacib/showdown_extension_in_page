import styled from "styled-components";
export const StatsContainer = styled.div`
  grid-row: 2/4;
  grid-column: 2/4;
  max-width: 15rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  background: #e0e7ea;
  border: 1px solid #aaa;
  font-size: 1.2em;
  padding: 0.2rem;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
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
