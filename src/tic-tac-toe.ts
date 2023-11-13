enum players {
  one = "player-1",
  two = "player-2"
}
const PLAYER_ONE_KEY = "X";
const PLAYER_TWO_KEY = "O";

const firstPlayer: players = players.one;
let currentPlayer: players = firstPlayer;

const handleClickOnTable = (ev: MouseEvent, table: HTMLTableElement) => {
  let char = currentPlayer === players.one ? PLAYER_ONE_KEY : PLAYER_TWO_KEY;

  const eventTarget: EventTarget | null = ev.target;

  if (eventTarget instanceof HTMLTableCellElement) {
    if (eventTarget.innerHTML.trim().length) return; // <--- prevent clicking on the same cell
    eventTarget.innerHTML = char;
    setTimeout(() => checkWinner(table), 0); // <--- had to set a timeout because the innerHTML was not being rendered before this
  }

  currentPlayer = currentPlayer === players.one ? players.two : players.one;
};

const resetGame = () => { };

const checkWinner = (table: HTMLTableElement) => {
  let isWin = false;
  let winner: string = "";

  // Check win by row
  const tableBody = table.children!.item(0)!;
  const tableRows: Element[] = [...tableBody.children];

  const rowValues: string[][] = [];

  tableRows.forEach((tableRow, index) => {
    const tableCells: Element[] = [...tableRow.children];
    const cellValues: string[] = [];

    tableCells.forEach((cell) => {
      cellValues.push(cell.innerHTML);
    });

    rowValues[index] = cellValues;
  });

  rowValues.every((row: string[]) => {
    const areTheSame = row.every(s => s === row[0])

    if (areTheSame) {
      isWin = true;
      // who won?
      winner = row[0] === PLAYER_ONE_KEY ? "Player #1" : "Player #2";
      return true;
    }

    return false;
  });

  // Check win by column

  // Check win in diagonal

  if (isWin) {
    alert(`${winner} won!`);
    resetGame();
  }
};

export const ticTacToeIn = (table: HTMLTableElement) => {
  table.addEventListener("click", (ev: MouseEvent) => { handleClickOnTable(ev, table) });
};