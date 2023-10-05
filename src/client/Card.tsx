import { Sprite } from "@pixi/react";

type CardProps = {
  image: string;
  x: number;
  y: number;
};

export default function Card({ x, y, image }: CardProps) {
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
      height={518}
      width={375}
      scale={0.4}
      x={x}
      y={y}
      anchor={{ x: 0.5, y: 0.5 }}
      eventMode="static"
      cursor="pointer"
      pointerdown={onDragStart}
      pointerup={onDragEnd}
      pointerupoutside={onDragEnd}
      pointermove={onDragMove}
    />
  );
}
