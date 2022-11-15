/*global chrome*/
import React, { useState } from "react";
import "./App.css";
import { TypeWriterContainer } from "./TypeWriterContainer.style";
import { AppDisplay, Button, BottomBorder } from "./App.styles";
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
  console.log("hello from extension");
  const [opponentsTeam, setOpponentsTeam] = useState<boolean>(true);
  const [changeDisplay, setChangeDisplay] = useState<boolean>(false);
  const { ref, width, height } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width, height }) => {
      console.log("onResize", width, height);
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
        <Button onClick={() => setOpponentsTeam(!opponentsTeam)}>
          Swap to {opponentsTeam ? "User's Team" : "Opponent's Team"}
        </Button>
        <TypeWriterContainer>
          <h1>Poke Info</h1>
        </TypeWriterContainer>
        <TeamDisplay roomId={roomId} opponentsTeam={opponentsTeam} />
      </AppDisplay>
      <BottomBorder />
    </>
  );
};

export default App;
