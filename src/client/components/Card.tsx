import { Sprite } from "@pixi/react";
import { cardHeight, cardWidth } from "../constants";

type CardProps = {
  image: string;
  x: number;
  y: number;
  zIndex: number;
};

export default function Card({ x, y, image, zIndex }: CardProps) {
  const onDragStart = (event: any) => {
    const sprite = event.currentTarget;
    sprite.alpha = 0.5;
    sprite.data = event.data;
    sprite.dragging = true;
  };

  const onDragEnd = (event: any) => {
    const sprite = event.currentTarget;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.data = null;
  };

  const onDragMove = (event: any) => {
    const sprite = event.currentTarget;
    if (sprite.dragging) {
      const newPosition = sprite.data!.getLocalPosition(sprite.parent);
      sprite.x = newPosition.x;
      sprite.y = newPosition.y;
    }
  };

  return (
    <Sprite
      image={image}
      height={cardHeight}
      width={cardWidth}
      x={x}
      y={y}
      zIndex={zIndex}
      anchor={{ x: 0.5, y: 0.5 }}
      eventMode="static"
      cursor="pointer"
      pointerdown={onDragStart}
      pointerup={onDragEnd}
      pointerupoutside={onDragEnd}
      pointermove={onDragMove}
      onmouseenter={(e: any) => {
        e.currentTarget.zIndex = 11;
        e.currentTarget.scale.set(0.45, 0.45);
      }}
      onmouseleave={(e: any) => {
        e.currentTarget.zIndex = zIndex;
        e.currentTarget.scale.set(0.4, 0.4);
      }}
    />
  );
}
