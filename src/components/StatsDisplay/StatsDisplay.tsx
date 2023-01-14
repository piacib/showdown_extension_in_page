import React, { useEffect, useState } from "react";
import { Dex } from "@pkmn/dex";
import {
  StatsContainer,
  StatBox,
  StatName,
  StatValue,
  StatsHead,
  StatBar,
  Bar,
  StatsTableRow,
} from "./StatsDisplay.style";
interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}
type keyOfStats = keyof Stats;
interface obj {
  [keyOfStats: string]: string;
}
const stateNameObj: obj = {
  hp: "HP",
  atk: "Attack",
  def: "Defense",
  spa: "Sp. Atk",
  spd: "Sp. Def",
  spe: "Speed",
};
interface StatsDisplayProps {
  pokemon: string;
}
const StatsDisplay: React.FC<StatsDisplayProps> = ({ pokemon }) => {
  const [stats, setStats] = useState<Stats>({
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  });
  useEffect(() => {
    if (Dex.species.get(pokemon).exists) {
      setStats(Dex.species.get(pokemon).baseStats);
    }
  }, [pokemon]);

  return (
    <StatsContainer>
      <StatsHead>
        <th>
          <h2>Stats</h2>
        </th>
      </StatsHead>
      {Object.entries(stats).map((x) => (
        <StatsTableRow>
          <StatBox key={`${x[0]}`}>
            <StatName>{stateNameObj[x[0]]}:</StatName>
            <StatValue>
              <b>{x[1]}</b>
            </StatValue>
          </StatBox>
          <StatBar>
            <Bar stat={x[1]}></Bar>
          </StatBar>
        </StatsTableRow>
      ))}
    </StatsContainer>
  );
};

export default StatsDisplay;
