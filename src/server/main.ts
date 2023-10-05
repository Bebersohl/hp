import express from "express";
import ViteExpress from "vite-express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

io.on("connection", (socket) => {
  console.log("connection!");
  socket.on("chat message", (msg) => {
    console.log("chat message:", msg);
    io.emit("chat message", msg);
  });
});

httpServer.listen(3000, function () {
  console.log(`Listening on port 3000`);
});

ViteExpress.bind(app, httpServer);
