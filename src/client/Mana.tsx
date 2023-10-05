import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

type ManaProps = {
  mana: number;
  maxMana: number;
  x: number;
  y: number;
};

export default function Mana({ mana, maxMana, x, y }: ManaProps) {
  return (
    <Text
      text={`${mana} / ${maxMana}`}
      anchor={{ x: 0.5, y: 0.5 }}
      x={x}
      y={y}
      style={
        new TextStyle({
          fill: "blue",
          stroke: "black",
          strokeThickness: 5,
          fontWeight: "bolder",
          fontSize: 26,
        })
      }
    />
  );
}
