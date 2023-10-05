import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

type AttackProps = {
  x: number;
  y: number;
  text: string;
};

export default function Attack({ x, y, text }: AttackProps) {
  return (
    <Text
      text={text}
      anchor={{ x: 0.5, y: 0.5 }}
      x={x}
      y={y}
      style={
        new TextStyle({
          fill: "yellow",
          stroke: "black",
          strokeThickness: 5,
          fontWeight: "bolder",
          fontSize: 26,
        })
      }
    />
  );
}
