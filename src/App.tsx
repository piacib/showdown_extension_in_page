///<reference types="chrome"/>
import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
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
  const [team, setTeam] = useState();
  console.log("hello from extension");
  const [randomBattle, setRandomBattle] = useState<string | false>(false);
  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    if (path.includes("randombattle")) {
      const match = path.match(/(?<=\-).+?(?=\-)/);
      if (match && match[0]) {
        setRandomBattle(match[0]);
      }
    }
  }, []);
  console.log("randomBattle", randomBattle);
  return (
    <AppDisplay>
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
