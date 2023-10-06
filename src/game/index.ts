import { Socket } from "socket.io";

export default function createGame(options: Options) {
  const game: Game = {
    p1: createPlayer(options.p1.deck),
    p2: createPlayer(options.p2.deck),
    turn: "p1",
    round: 1,
    status: "init",
  };

  const api = {
    roomId: options.roomId,
    startGame,
    getBoardState,
    playCard,
    endTurn,
    minionAttack,
  };

  return api;

  function opponentPlayer(playerKey: PlayerKey) {
    if (playerKey === "p1") {
      return "p2";
    }

    return "p1";
  }

  function minionAttack(attackerIndex: number, victimIndex: number | "hero") {
    const player = game[game.turn];
    const victimPlayer = game[opponentPlayer(game.turn)];

    if (game.status !== "in progress") {
      console.log("Cannot attack. Game is not in progress.");
      return api;
    }

    const attackerMinion = player.minions[attackerIndex];

    if (!attackerMinion) {
      console.log("Cannot attack. Attacking minion not found.");
      return api;
    }

    if (!attackerMinion.hasAction) {
      console.log("Cannot attack. Attacking minion has no action.");
      return api;
    }

    if (victimIndex === "hero") {
      victimPlayer.health -= attackerMinion.attack;
      attackerMinion.hasAction = false;
      checkForWinner();
      return api;
    }

    const victimMinion = victimPlayer.minions[victimIndex];

    if (!victimMinion) {
      console.log("Cannot attack. Victim minion not found.");
      return api;
    }

    victimMinion.health -= attackerMinion.attack;
    attackerMinion.hasAction = false;

    if (victimMinion.health <= 0) {
      victimPlayer.minions.splice(victimIndex, 1);
    }

    return api;
  }

  function playCard(cardIndex: number, boardIndex: number) {
    const player = game[game.turn];

    if (game.status !== "in progress") {
      console.log("Cannot play card. Game is not in progress.");
      return api;
    }

    if (player.hand.at(cardIndex) === undefined) {
      console.log("Cannot play card. Card does not exist.");
      return api;
    }

    if (player.hand[cardIndex].cost > player.mana) {
      console.log("Cannot play card. Insufficient mana.");
      return api;
    }

    if (player.minions.length >= 7) {
      console.log(`Cannot play card. ${game.turn}'s board is full.`);
      return api;
    }

    if (boardIndex < 0 || boardIndex > 6) {
      console.log("Cannot play card. Invalid board index.");
      return api;
    }

    const [card] = player.hand.splice(cardIndex, 1);

    player.mana -= card.cost;

    player.minions.splice(boardIndex, 0, {
      health: card.health,
      attack: card.attack,
      hasAction: false,
      name: card.name,
    });

    return api;
  }

  function endTurn() {
    if (game.status !== "in progress") {
      console.log("Cannot end turn. Game is not in progress.");
      return api;
    }

    if (game.turn === "p1") {
      startTurn("p2");
      return api;
    }

    game.round += 1;
    startTurn("p1");
    return api;
  }

  function startTurn(playerKey: PlayerKey) {
    const player = game[playerKey];
    const maxMana = Math.min(game.round, 10);

    drawCards(playerKey, 1);
    player.mana = maxMana;
    player.maxMana = maxMana;

    player.minions.forEach((minion) => (minion.hasAction = true));
    game.turn = playerKey;
  }

  function getBoardState(playerKey: "p1" | "p2"): BoardState {
    const {
      hand: opponentHand,
      deck: opponentDeck,
      ...opponent
    } = game[opponentPlayer(playerKey)];

    const { deck, ...player } = game[playerKey];

    return {
      turn: "p1",
      round: 1,
      status: "init",
      player: {
        deckCount: deck.length,
        ...player,
      },
      opponent: {
        handCount: opponentHand.length,
        deckCount: opponentDeck.length,
        ...opponent,
      },
    };
  }

  function createPlayer(deck: Card[]): Player {
    return {
      health: 30,
      minions: [],
      deck,
      hand: [],
      mana: 0,
      maxMana: 0,
      burnCount: 0,
    };
  }

  function startGame() {
    if (game.status !== "init") {
      console.log("Cannot call startGame(). Game has already started.");
      return api;
    }

    drawCards("p1", 5);
    drawCards("p2", 5);
    game.status = "in progress";
    startTurn("p1");

    return api;
  }

  function checkForWinner() {
    if (game.p1.health <= 0 && game.p2.health <= 0) {
      game.status = "draw";
    }

    if (game.p1.health <= 0) {
      game.status = "p1 win";
    }

    if (game.p2.health <= 0) {
      game.status = "p2 win";
    }
  }

  function drawCards(playerKey: PlayerKey, numOfCards: number) {
    const player = game[playerKey];

    for (let i = 0; i < numOfCards; i++) {
      const card = player.deck.pop();

      if (card && player.hand.length < 10) {
        player.hand.push(card);
      }

      if (!card) {
        player.burnCount += 1;
        player.health -= player.burnCount;
        checkForWinner();
      }
    }
  }
}

export type Game = {
  p1: Player;
  p2: Player;
  turn: PlayerKey;
  round: number;
  status: GameStatus;
};

type GameStatus = "init" | "in progress" | "p1 win" | "p2 win" | "draw";

type Player = {
  health: number;
  minions: Minion[];
  deck: Card[];
  hand: Card[];
  mana: number;
  maxMana: number;
  burnCount: number;
};

type Oppononent = Omit<Player, "hand" | "deck"> & {
  handCount: number;
  deckCount: number;
};

export type Card = {
  type: "minion";
  cost: number;
  health: number;
  attack: number;
  name: string;
};

export type Minion = {
  health: number;
  attack: number;
  hasAction: boolean;
  name: string;
};

type Options = {
  p1: {
    deck: Card[];
    socket: Socket;
  };
  p2: {
    deck: Card[];
    socket: Socket;
  };
  roomId: string;
};

type PlayerKey = "p1" | "p2";

export type BoardState = {
  turn: PlayerKey;
  round: number;
  status: GameStatus;
  player: Omit<Player, "deck"> & { deckCount: number };
  opponent: Oppononent;
};
