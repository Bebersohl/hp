import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { ComponentProps, useCallback } from "react";
import Health from "./Health";
import { heroSize } from "./../constants";

type Draw = NonNullable<ComponentProps<typeof Graphics>["draw"]>;

type HeroProps = {
  health: number;
  name: string;
  x: number;
  y: number;
};

export default function Hero({ health, name, x, y }: HeroProps) {
  const draw = useCallback<Draw>((g) => {
    g;
    g.clear();
    g.beginFill("white");
    g.drawRect(0, 0, heroSize, heroSize);
    g.endFill();
  }, []);

  return (
    <Container position={[x, y]} anchor={{ x: 0.5, y: 0.5 }}>
      <Graphics
        anchor={{ x: 0.5, y: 0.5 }}
        draw={draw}
        pivot={[heroSize / 2, heroSize / 2]}
      />
      <Health text={health.toString()} x={heroSize / 2} y={heroSize / 2} />
      <Text
        text={name}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={0}
        style={
          new TextStyle({
            fontSize: 12,
            wordWrap: true,
            wordWrapWidth: 40,
            align: "center",
          })
        }
      />
    </Container>
  );
}
