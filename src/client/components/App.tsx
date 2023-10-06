import "./App.css";
import { Stage } from "@pixi/react";
import { useEffect, useState } from "react";
import { socket } from "./../socket";
import Hand from "./Hand";
import { BoardState, Card, Minion } from "../../game";
import Hero from "./Hero";
import EndTurn from "./EndTurn";
import Mana from "./Mana";
import { useWindowSize } from "@react-hook/window-size";
import {
  cardHeight,
  heroSize,
  minionHeight,
  minionWidth,
} from "./../constants";
import MinionRow from "./MinionRow";
import DeckCount from "./DeckCount";
import HandCount from "./HandCount";

export default function App() {
  const [width, height] = useWindowSize();
  const [boardState, setBoardState] = useState<BoardState | null>(null);

  console.log("boardState", boardState);

  useEffect(() => {
    function onConnect() {}

    function onDisconnect() {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("game created", (boardState) => {
      console.log("game created", boardState);
      setBoardState(boardState);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  if (boardState === null) {
    return <p>Waiting for opponent</p>;
  }

  return (
    <Stage height={height} width={width} options={{ background: "#1099bb" }}>
      {/* OPPONENT */}
      <DeckCount count={boardState.opponent.deckCount} x={width - 40} y={60} />
      <HandCount count={boardState.opponent.handCount} x={30} y={30} />
      <Hero
        health={boardState.opponent.health}
        name="Enemy Hero"
        x={width / 2}
        y={heroSize / 2}
      />
      <Mana
        mana={boardState.opponent.mana}
        maxMana={boardState.opponent.maxMana}
        x={width - 40}
        y={30}
      />
      <MinionRow
        minions={boardState.opponent.minions}
        x={width / 2 - 50 * (boardState.opponent.minions.length - 1)}
        y={height / 2 - minionHeight * 4.1}
      />

      {/* PLAYER */}
      <DeckCount
        count={boardState.player.deckCount}
        x={width - 40}
        y={height - 60}
      />
      <MinionRow
        minions={boardState.player.minions}
        x={width / 2 - 50 * (boardState.player.minions.length - 1)}
        y={height / 2 - minionHeight * 1.8}
      />
      <Hero
        health={boardState.player.health}
        name="Hero"
        x={width / 2}
        y={300}
      />
      <Mana
        mana={boardState.player.mana}
        maxMana={boardState.player.maxMana}
        x={width - 40}
        y={height - 30}
      />
      <Hand
        cards={boardState.player.hand}
        x={width / 2 - 50 * (boardState.player.hand.length - 1)}
        y={height - cardHeight / 2}
      />

      <EndTurn x={width - 100} y={height / 2} />
    </Stage>
  );
}
