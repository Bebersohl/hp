import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { ComponentProps, useCallback } from "react";
import Attack from "./Attack";
import Health from "./Health";

type Draw = NonNullable<ComponentProps<typeof Graphics>["draw"]>;

type EndTurnProps = { x: number; y: number };

export default function EndTurn({ x, y }: EndTurnProps) {
  const draw = useCallback<Draw>((g) => {
    g;
    g.clear();
    g.beginFill("yellow");
    g.drawRoundedRect(0, 0, 100, 50, 15);
    g.endFill();
  }, []);

  return (
    <Container position={[x, y]} anchor={{ x: 0.5, y: 0.5 }}>
      <Graphics
        anchor={{ x: 0.5, y: 0.5 }}
        draw={draw}
        interactive
        cursor="pointer"
        onpointerdown={() => console.log("end turn")}
      />
      <Text
        text="End Turn"
        anchor={{ x: 0.5, y: 0.5 }}
        x={50}
        y={25}
        style={
          new TextStyle({
            fontSize: 12,
            fill: "black",
          })
        }
      />
    </Container>
  );
}
