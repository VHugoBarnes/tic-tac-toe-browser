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

/**
 * We put the tableElement outside of the bootstrap 
 * function (ticTacToeIn) because it is used in many functions.
 */
let tableElement: HTMLTableElement;

/**
 * Checks on which <td> cell it was clicked
 * to place the player character and also calls
 * validations() function to determine if
 * there's a winner.
 */
const handleClickOnTable = (ev: MouseEvent) => {
  let char = currentPlayer === players.one ? PLAYER_ONE_KEY : PLAYER_TWO_KEY;

  const eventTarget: EventTarget | null = ev.target;

  if (eventTarget instanceof HTMLTableCellElement) {
    if (eventTarget.innerHTML.trim().length) return; // <--- prevent clicking on the same cell
    eventTarget.innerHTML = char;
    setTimeout(() => validations(), 0); // <--- had to set a timeout because the innerHTML was not being rendered before this
  }

  currentPlayer = currentPlayer === players.one ? players.two : players.one;
};

/**
 * Utility function to get the table rows from
 * the table.
 */
const getTableRows = (): Element[] => {
  const tableBody = tableElement.children!.item(0)!;
  const tableRows: Element[] = [...tableBody.children];

  return tableRows;
}

/**
 * resets the game by cleaning the content of the
 * <td>'s in the table, and also the current player
 * to start with player #1.
 */
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

/**
 * gets a matrix (array of arrays) and checks each array
 * to see if all strings inside the array are the same,
 * and determines who is the winner by comparing it to
 * PLAYER_ONE_KEY or PLAYER_TWO_KEY.
 */
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

/**
 * Gets the values of the cells and calls a function to 
 * check who won.
 */
const validations = () => {
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

/**
 * Function that gets exported to start the game.
 */
export const ticTacToeIn = (table: HTMLTableElement) => {
  tableElement = table;
  tableElement.addEventListener("click", (ev: MouseEvent) => { handleClickOnTable(ev) });

  document.querySelector<HTMLButtonElement>("#reset-button")!.addEventListener("click", resetGame)
};