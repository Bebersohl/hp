import { Container } from "@pixi/react";
import Minion from "./Minion";
import { Minion as MinionType } from "../../game";
import { minionWidth } from "./../constants";

type MinionRow = {
  minions: MinionType[];
  x: number;
  y: number;
};

export default function MinionRow({ minions, x, y }: MinionRow) {
  return (
    <Container position={[x, y]} anchor={{ x: 0.5, y: 0.5 }}>
      {minions.map((minion, index) => (
        <Minion minion={minion} x={index * 100} y={0} key={index} />
      ))}
    </Container>
  );
}
