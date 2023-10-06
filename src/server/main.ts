import express from "express";
import ViteExpress from "vite-express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import createGame, { Card } from "../game";
import { id } from "../util";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const card: Card = {
  type: "minion",
  cost: 2,
  health: 1,
  attack: 2,
  name: "Mechanical Dragonling",
};

const deck = [card, card, card, card, card, card, card, card, card, card];

let waitingRoom: Socket[] = [];

const games: any = {};

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    waitingRoom = waitingRoom.filter(
      (waitingSocket) => waitingSocket !== socket,
    );
  });

  if (waitingRoom.length === 0) {
    return waitingRoom.unshift(socket);
  }

  const waitingSocket = waitingRoom.pop();

  const roomId = id();

  const game = createGame({
    p1: { deck: [...deck], socket: socket },
    p2: { deck: [...deck], socket: waitingSocket! },
    roomId,
  }).startGame();

  games[socket.id] = game;
  games[waitingSocket!.id] = game;

  socket.join(roomId);
  waitingSocket?.join(roomId);

  socket.emit("game created", game.getBoardState("p1"));
  waitingSocket!.emit("game created", game.getBoardState("p2"));
});

httpServer.listen(3000, function () {
  console.log(`Listening on port 3000`);
});

ViteExpress.bind(app, httpServer);
