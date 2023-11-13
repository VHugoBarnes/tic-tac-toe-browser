enum players {
  one = "player-1",
  two = "player-2"
}

const firstPlayer: players = players.one;
let currentPlayer: players = firstPlayer;

const handleClickOnCell = (ev: MouseEvent) => {
  let char = currentPlayer === players.one ? "X" : "O";

  const eventTarget: EventTarget | null = ev.target;

  if (eventTarget instanceof HTMLTableCellElement) {
    eventTarget.innerHTML = char;
  }

  currentPlayer = currentPlayer === players.one ? players.two : players.one;
};

export const ticTacToeIn = (table: HTMLTableElement) => {
  table.addEventListener("click", handleClickOnCell);
};