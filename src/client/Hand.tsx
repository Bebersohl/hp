import { Card as CardType } from "../game";
import Card from "./Card";

type HandProps = {
  cards: CardType[];
};

export default function Hand({ cards }: HandProps) {
  return cards.map((card, index) => {
    return (
      <Card x={100} y={100} image="src/client/assets/59.png" key={index} />
    );
  });
}
