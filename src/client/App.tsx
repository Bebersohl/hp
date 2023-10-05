import "./App.css";
import { Stage } from "@pixi/react";
import { useEffect, useMemo, useState } from "react";
import { socket } from "./socket";
import Hand from "./Hand";
import { Card } from "../game";
import Minion from "./Minion";
import Hero from "./Hero";
import EndTurn from "./EndTurn";
import Mana from "./Mana";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const cards: Card[] = [
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
  ];

  const boardWidth = 1280;
  const boardHeight = 584;

  return (
    <div>
      <Stage
        width={boardWidth}
        height={boardHeight}
        options={{ backgroundColor: 0xff0000 }}
      >
        <Hand cards={cards} />
        <Minion attack={2} health={1} name="Mechanical Dragonling" />
        <Hero health={30} name="Enemy Hero" x={boardWidth / 2} y={0} />
        <Hero health={30} name="Hero" x={boardWidth / 2} y={300} />
        <EndTurn x={boardWidth - 100} y={boardHeight / 2} />
        <Mana mana={3} maxMana={6} x={boardWidth - 30} y={30} />
        <Mana mana={3} maxMana={6} x={boardWidth - 30} y={boardHeight - 30} />
      </Stage>
    </div>
  );
}
