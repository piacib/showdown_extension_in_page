/*global chrome*/
import React, { useState } from "react";
import "./App.css";
import { TypeWriterContainer } from "./TypeWriterContainer.style";
import { AppDisplay, Button, BottomBorder } from "./App.style";
import { TeamDisplay } from "./components/TeamDisplay/TeamDisplay";
import useResizeObserver from "use-resize-observer";
const config = {
  childList: true,
  subtree: true,
};

const displayCutOff = 600;
export interface AppProps {
  /** room-battle-${string}-${number} */
  roomId: string;
}
const App: React.FC<AppProps> = ({ roomId }) => {
  const [opponentsTeam, setOpponentsTeam] = useState<boolean>(true);
  const [changeDisplay, setChangeDisplay] = useState<boolean>(false);
  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width, height }) => {
      if (!width || !height) {
        return;
      }
      if (width < displayCutOff && !changeDisplay) {
        setChangeDisplay(true);
      }
      if (width > displayCutOff && changeDisplay) {
        setChangeDisplay(false);
      }
    },
  });
 
  return (
    <>
      <AppDisplay changeDisplay={changeDisplay} ref={ref}>
        <TypeWriterContainer>
          <h1>Poke Info</h1>
        </TypeWriterContainer>
        <Button onClick={() => setOpponentsTeam(!opponentsTeam)}>Switch Team</Button>
        <TeamDisplay roomId={roomId} opponentsTeam={opponentsTeam} />
      </AppDisplay>
      <BottomBorder />
    </>
  );
};

export default App;
