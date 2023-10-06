import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

type DeckCountProps = {
  x: number;
  y: number;
  count: number;
};

export default function DeckCount({ x, y, count }: DeckCountProps) {
  return (
    <Text
      text={count.toString()}
      anchor={{ x: 0.5, y: 0.5 }}
      x={x}
      y={y}
      style={
        new TextStyle({
          fill: "tan",
          stroke: "black",
          strokeThickness: 5,
          fontWeight: "bolder",
          fontSize: 26,
          align: "center",
        })
      }
    />
  );
}
