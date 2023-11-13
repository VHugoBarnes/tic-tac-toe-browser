export const transposeMatrix = (matrix: string[][]) => {
  const rowsLength = matrix.length;
  const colsLength = matrix[0].length;

  let newMatrix = new Array(colsLength);

  for (let rowsIndex = 0; rowsIndex < colsLength; rowsIndex++) {
    newMatrix[rowsIndex] = new Array(rowsLength); // <--- create the array that is going to be inside the array [[]]

    for (let colsIndex = 0; colsIndex < rowsLength; colsIndex++) {
      newMatrix[rowsIndex][colsIndex] = matrix[colsIndex][rowsIndex];
    }
  }

  return newMatrix;
}

export const getDiagonals = (matrix: string[][]) => {
  const matrixLength = matrix.length;
  let mainDiagonal = new Array(matrixLength);
  let antiDiagonal = new Array(matrixLength);

  for (let i = 0; i < matrixLength; i++) {
    // Main diagonal: elements where the row and column indices are the same
    mainDiagonal[i] = matrix[i][i];
    // Anti-diagonal: elements where the column index is (n - 1 - row index)
    antiDiagonal[i] = matrix[i][matrixLength - 1 - i];
  }

  return [mainDiagonal, antiDiagonal];
}