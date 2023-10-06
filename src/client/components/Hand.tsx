import { Container } from "@pixi/react";
import { Card as CardType } from "../../game";
import Card from "./Card";

type HandProps = {
  cards: CardType[];
  x: number;
  y: number;
};

export default function Hand({ cards, x, y }: HandProps) {
  return (
    <Container position={[x, y]} anchor={{ x: 0.5, y: 0.5 }} sortableChildren>
      {cards.map((card, index) => {
        return (
          <Card
            x={100 * index}
            y={0}
            zIndex={index}
            image="src/client/assets/59.png"
            key={index}
          />
        );
      })}
    </Container>
  );
}
