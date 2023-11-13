import { transposeMatrix, getDiagonals } from "./utils";

enum players {
  one = "player-1",
  two = "player-2"
}
const PLAYER_ONE_KEY = "X";
const PLAYER_TWO_KEY = "O";
const BLANK_CELL = " ";

const firstPlayer: players = players.one;
let currentPlayer: players = firstPlayer;

let tableElement: HTMLTableElement;

const handleClickOnTable = (ev: MouseEvent) => {
  let char = currentPlayer === players.one ? PLAYER_ONE_KEY : PLAYER_TWO_KEY;

  const eventTarget: EventTarget | null = ev.target;

  if (eventTarget instanceof HTMLTableCellElement) {
    if (eventTarget.innerHTML.trim().length) return; // <--- prevent clicking on the same cell
    eventTarget.innerHTML = char;
    setTimeout(() => checkWinner(), 0); // <--- had to set a timeout because the innerHTML was not being rendered before this
  }

  currentPlayer = currentPlayer === players.one ? players.two : players.one;
};

const getTableRows = (): Element[] => {
  const tableBody = tableElement.children!.item(0)!;
  const tableRows: Element[] = [...tableBody.children];

  return tableRows;
}

const resetGame = (ev?: Event) => {
  if (ev) ev.preventDefault();
  const tableRows: Element[] = getTableRows();

  tableRows.forEach((tableRow) => {
    const tableCells: Element[] = [...tableRow.children];

    tableCells.forEach((cell: Element) => {
      cell.innerHTML = BLANK_CELL;
    });
  });

  currentPlayer = firstPlayer;
};

const winnerChecker = (matrix: string[][]): { winner: string } => {
  let winner = "";
  matrix.every((row: string[]) => {
    const areTheSame = row.every(s => (s === row[0] && s.trim().length > 0))

    if (areTheSame) {
      // who won?
      winner = row[0] === PLAYER_ONE_KEY ? "Player #1" : "Player #2";
      return false; // <--- return false to finish the loop
    }

    return true;
  });

  return { winner: winner };
}

const checkWinner = () => {
  let isWin = false;
  let winner: string = "";
  const tableValues: string[][] = [];

  const tableRows: Element[] = getTableRows();

  // Pass everything into a Matrix
  tableRows.forEach((tableRow, i) => {
    const tableCells: Element[] = [...tableRow.children];
    const cellValues: string[] = [];

    tableCells.forEach((cell) => {
      cellValues.push(cell.innerHTML);
    });

    tableValues[i] = cellValues;
  });

  // Invert values
  const invertedTableValues = transposeMatrix(tableValues);
  const diagonalsOfTableValues = getDiagonals(tableValues);

  // Check win by row, column, and diagonal
  [tableValues, invertedTableValues, diagonalsOfTableValues].every((matrix: string[][]) => {
    const { winner: whoWon } = winnerChecker(matrix);

    if (whoWon !== "") {
      isWin = true;
      winner = whoWon;
      return false;
    }

    return true;
  });

  if (isWin) {
    alert(`${winner} won!`);
    resetGame();
  }
};

export const ticTacToeIn = (table: HTMLTableElement) => {
  tableElement = table;
  tableElement.addEventListener("click", (ev: MouseEvent) => { handleClickOnTable(ev) });

  document.querySelector<HTMLButtonElement>("#reset-button")!.addEventListener("click", resetGame)
};