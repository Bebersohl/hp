import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { ComponentProps, useCallback } from "react";
import Health from "./Health";

type Draw = NonNullable<ComponentProps<typeof Graphics>["draw"]>;

type HeroProps = {
  health: number;
  name: string;
  x: number;
  y: number;
};

const size = 60;

export default function Hero({ health, name, x, y }: HeroProps) {
  const draw = useCallback<Draw>((g) => {
    g;
    g.clear();
    g.beginFill("white");
    g.drawRect(0, 0, size, size);
    g.endFill();
  }, []);

  return (
    <Container position={[x, y]} anchor={{ x: 0.5, y: 0.5 }}>
      <Graphics anchor={{ x: 0.5, y: 0.5 }} draw={draw} />
      <Health text={health.toString()} x={size} y={size} />
      <Text
        text={name}
        anchor={{ x: 0.5, y: 0.5 }}
        x={size / 2}
        y={size / 2}
        style={
          new TextStyle({
            fontSize: 12,
            wordWrap: true,
            wordWrapWidth: 40,
          })
        }
      />
    </Container>
  );
}
