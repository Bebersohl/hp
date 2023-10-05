import "./App.css";
import { BlurFilter } from "pixi.js";
import { Stage, Container, Sprite, Text } from "@pixi/react";
import { useEffect, useMemo, useState } from "react";
import { socket } from "./socket";
import ConnectionState from "./ConnectionState";

export default function App() {
  const blurFilter = useMemo(() => new BlurFilter(4), []);
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

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <Stage>
        <Sprite
          image="https://pixijs.io/pixi-react/img/bunny.png"
          x={400}
          y={270}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <Container x={400} y={330}>
          <Text
            text="Hello World"
            anchor={{ x: 0.5, y: 0.5 }}
            filters={[blurFilter]}
          />
        </Container>
      </Stage>
    </div>
  );
}
