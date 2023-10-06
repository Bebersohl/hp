import "./App.css";
import { Stage, useApp, AppProvider } from "@pixi/react";
import { useEffect, useMemo, useState } from "react";
import { socket } from "./socket";
import Hand from "./Hand";
import { Card } from "../game";
import Minion from "./Minion";
import Hero from "./Hero";
import EndTurn from "./EndTurn";
import Mana from "./Mana";
import { Application } from "pixi.js";
import { useWindowSize } from "@react-hook/window-size";
import { cardHeight, heroSize } from "./constants";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [width, height] = useWindowSize();
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
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },

    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
    {
      type: "minion",
      cost: 2,
      health: 1,
      attack: 2,
    },
  ];

  const cardWidth = 150;
  const cardCount = cards.length;

  return (
    <Stage height={height} width={width} options={{ background: "#1099bb" }}>
      <Minion attack={2} health={1} name="Mechanical Dragonling" />
      <Hero health={30} name="Enemy Hero" x={width / 2} y={heroSize / 2} />
      <Hero health={30} name="Hero" x={width / 2} y={300} />
      <EndTurn x={width - 100} y={height / 2} />
      <Mana mana={3} maxMana={6} x={width - 30} y={30} />
      <Mana mana={3} maxMana={6} x={width - 30} y={height - 30} />
      <Hand
        cards={cards}
        x={width / 2 - 50 * (cardCount - 1)}
        y={height - cardHeight / 2}
      />
    </Stage>
  );
}
