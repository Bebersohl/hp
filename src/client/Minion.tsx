import { Container, Graphics, Text, useApp } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { ComponentProps, useCallback } from "react";
import Attack from "./Attack";
import Health from "./Health";

type Draw = NonNullable<ComponentProps<typeof Graphics>["draw"]>;

type MinionProps = {
  attack: number;
  health: number;
  name: string;
};
const minionWidth = 32;
const minionHeight = 44;

export default function Minion({ attack, health, name }: MinionProps) {
  const draw = useCallback<Draw>((g) => {
    g;
    g.clear();
    g.beginFill("white");
    g.drawEllipse(0, 0, minionWidth, minionHeight);
    g.endFill();
  }, []);
  const app = useApp();
  console.log("app", app);

  return (
    <Container position={[150, 150]} anchor={{ x: 0.5, y: 0.5 }}>
      <Graphics anchor={{ x: 0.5, y: 0.5 }} draw={draw} />
      <Attack
        text={attack.toString()}
        x={minionWidth * -0.5}
        y={minionHeight - 10}
      />
      <Health
        text={health.toString()}
        x={minionWidth - 10}
        y={minionHeight - 10}
      />
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
          })
        }
      />
    </Container>
  );
}
