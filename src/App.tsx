import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import { TypeWriterContainer } from "./TypeWriterContainer.style";
import { AppDisplay, Button } from "./App.styles";
import { TeamDisplay } from "./components/TeamDisplay/TeamDisplay";
import { isDevelopmentMode } from "./functions";
import useResizeObserver from "use-resize-observer";

interface MoveResponse {
  move: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
}
const moveFetchPrepper = (move: string) => {
  return move.replace(" ", "-").toLowerCase();
};
export const getMoveData = (data: string[] | null) => {
  const dataSet: Array<MoveResponse> = [];
  if (data) {
    data.map((move: string) =>
      fetch(`https://pokeapi.co/api/v2/move/${moveFetchPrepper(move)}`)
        .then((resp) => resp.json())
        .then((json) =>
          dataSet.push({
            move: json.name,
            type: json.type.name,
            category: json.damage_class.name,
            power: json.power,
            accuracy: json.accuracy,
          })
        )
    );
  }
  return dataSet;
};
const displayCutOff = 600;
function App() {
  const [opponentsTeam, setOpponentsTeam] = useState<boolean>(true);
  const [team, setTeam] = useState();
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

  console.log("hello from extension");
  const [randomBattle, setRandomBattle] = useState<string | false>(
    isDevelopmentMode ? "gen8randomdoublesbattle" : false
  );
  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    if (path.includes("random")) {
      const match = path.match(/(?<=\-).+?(?=\-)/);
      if (match && match[0]) {
        setRandomBattle(match[0]);
      }
    }
  }, []);

  console.log("randomBattle", randomBattle);
  return (
    <AppDisplay changeDisplay={changeDisplay} ref={ref}>
      <Button onClick={() => setOpponentsTeam(!opponentsTeam)}>
        Swap to {opponentsTeam ? "Users Team" : "Opponents Team"}
      </Button>
      <TypeWriterContainer>
        <h1>Poke Info</h1>
      </TypeWriterContainer>
      <TeamDisplay
        opponentsTeam={opponentsTeam}
        isRandomBattle={randomBattle}
      />
    </AppDisplay>
  );
}

export default App;
