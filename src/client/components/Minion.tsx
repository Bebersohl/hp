import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { ComponentProps, useCallback } from "react";
import Attack from "./Attack";
import Health from "./Health";
import { Minion as MinionType } from "../../game";
import { minionHeight, minionWidth } from "./../constants";

type Draw = NonNullable<ComponentProps<typeof Graphics>["draw"]>;

type MinionProps = {
  minion: MinionType;
  x: number;
  y: number;
};

export default function Minion({ minion, x, y }: MinionProps) {
  const { health, attack, name } = minion;
  const draw = useCallback<Draw>((g) => {
    g;
    g.clear();
    g.beginFill("white");
    g.drawEllipse(0, 0, minionWidth, minionHeight);
    g.endFill();
  }, []);

  return (
    <Container position={[x, y]} anchor={{ x: 0.5, y: 0.5 }}>
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
