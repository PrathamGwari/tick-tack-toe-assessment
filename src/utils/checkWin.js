function checkWin(gameGrid, currentPlayer, winningCriteria) {
  const symbol = currentPlayer.symbol.toLowerCase();
  const checkConsecutive = (arr) =>
    arr
      .join("")
      .match(new RegExp(`(${symbol})\\1{${winningCriteria - 1}}`, "g"));

  // Check rows
  for (let row = 0; row < gameGrid.length; row++) {
    if (checkConsecutive(gameGrid[row])) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < gameGrid.length; col++) {
    const column = gameGrid.map((row) => row[col]);
    if (checkConsecutive(column)) {
      return true;
    }
  }

  // Check diagonals
  let diagonal1 = [];
  let diagonal2 = [];
  for (let i = 0; i < gameGrid.length; i++) {
    diagonal1.push(gameGrid[i][i]);
    diagonal2.push(gameGrid[i][gameGrid.length - 1 - i]);
  }
  if (checkConsecutive(diagonal1) || checkConsecutive(diagonal2)) {
    return true;
  }

  return false;
}

export { checkWin };
