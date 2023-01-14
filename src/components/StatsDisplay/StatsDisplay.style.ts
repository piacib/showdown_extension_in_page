import styled, { css } from "styled-components";
export const StatsContainer = styled.table`
  grid-column: 2/4;
  /* display: grid; */
  /* grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px; */
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
export const StatBox = styled.th`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 0.4rem;
  max-width: 10rem;
`;
export const TextOneLine = css`
  overflow: hidden;
  white-space: nowrap;
`;
export const StatName = styled.div`
  ${TextOneLine}
`;
export const StatValue = styled.div``;
export const StatsHead = styled.thead`
  background: green;
  * > h2 {
    margin: 0;
  }
`;
export const StatBar = styled.td`
  width: 75%;
`;
interface StatEntry {
  stat: number;
}
export const Bar = styled.div<StatEntry>`
  height: 20px;
  width: ${(props) => `${(props.stat * 100) / 255}%`};
  background: yellow;
`;
export const StatsTableRow = styled.tr`
  background-color: red;
`;
