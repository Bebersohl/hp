import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

type HealthProps = {
  x: number;
  y: number;
  text: string;
};

export default function Health({ x, y, text }: HealthProps) {
  return (
    <Text
      text={text}
      anchor={{ x: 0.5, y: 0.5 }}
      x={x}
      y={y}
      style={
        new TextStyle({
          fill: "red",
          stroke: "black",
          strokeThickness: 5,
          fontWeight: "bolder",
          fontSize: 26,
        })
      }
    />
  );
}
