///<reference types="chrome"/>
import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { TypeWriterContainer } from "./TypeWriterContainer.style";
import { AppDisplay, Button } from "./App.styles";
import { TeamDisplay } from "./components/TeamDisplay/TeamDisplay";
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

function App() {
  const [opponentsTeam, setOpponentsTeam] = useState<boolean>(true);
  const [team,setTeam]=useState()
  console.log("hello from extension");
  console.log(getMoveData(["solar-beam"]));
  return (
    <AppDisplay>
      <Button onClick={() => setOpponentsTeam(!opponentsTeam)}>
        Swap to {opponentsTeam ? "Users Team" : "Opponents Team"}
      </Button>
      <h1>hELLO</h1>
      <TypeWriterContainer>
        <h1>Poke Info</h1>
      </TypeWriterContainer>
      <p>I'm a Content Script in a Chrome Extension!</p>
      <TeamDisplay  team={null} isRandomBattle={null} />
    </AppDisplay>
  );
}

export default App;
