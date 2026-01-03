function printBoard(board){
  console.clear();
  let placeholder = 1;
  let boardString = "";

  for (let row = 0; row < 3; row++) {
    let array = [];
    for (let col = 0; col < 3; col++) {
      const tile = board[row][col] === "" ? placeholder.toString() : board[row][col];
      array.push(tile);
      placeholder++;
    }
    boardString += array.join(" | ");
    boardString += "\n-------------\n";
  }
  console.log(boardString);
}

function mapCombinationWithBoard(board, winCombination, char) {
  for (let index = 0; index < board.length; index++) {
    const element = winCombination[index];
    const row = element[0];
    const col = element[1];
    const isWinCombination = board[row][col] === char;

    if (!isWinCombination) {
      return false;
    }
  }

  return true;
}

function isWinner(board, char) {
  const winCombination = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"],
  ];

  for (let index = 0; index < winCombination.length; index++) {
    const win = mapCombinationWithBoard(board, winCombination[index], char);
    if (win) {
      return true;
    }
  }

  return false;
}

function playAgain(board) {
  const confirmation = confirm('Do you want to play again ?');
  if (confirmation) return play();
  console.log("Thanks for playing... 👋👋");
}

function isTileFilled(board, tile) {
  const box = [
    [0,0],[0,1],[0,2],
    [1,0],[1,1],[1,2],
    [2,0],[2,1],[2,2]
  ];
  const [i, j] = box[tile - 1];
  return board[i][j] !== "";
}

function placeValue(board, tile, playerChar, playerNumber) {
  const box = [
    [0,0], [0,1], [0,2],
    [1,0], [1,1], [1,2],
    [2,0], [2,1], [2,2]
  ];

  const [i, j] = box[tile - 1];
  board[i][j] = playerChar;
}

function userInput(board, playerNumber, playerChar) {
  const tile = parseInt(
    prompt(`Player ${playerNumber} (${playerChar}) : Enter the block number (1–9):`)
  );

  if (isNaN(tile) || tile < 1 || tile > 9) {
    console.log("❌ Invalid input, try again!");
    return userInput(board, playerNumber, playerChar);
  }

  if (isTileFilled(board, tile)) {
    console.log("❌ Tile already filled! Try again.");
    return userInput(board, playerNumber, playerChar);
  }

  placeValue(board, tile, playerChar);
  printBoard(board);
}

function checkWinner(board, playerChar, playerNumber) {
  if (isWinner(board, playerChar)) {
    console.log(`🎉 Player ${playerNumber} (${playerChar}) wins!`);
    return true;
  }
  return false;
}

function currentPlayer(turn) {
  return turn % 2 === 0 ? [1, '❌'] : [2, '🟢'];
}

function makeMove(board, turn) {
  const [num, char] = currentPlayer(turn);
  userInput(board, num, char);
  return [num, char ];
}

function play() {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let turn = 0;
  let gameOver = false;

  while (turn < 9 && !gameOver) {
    printBoard(board);
    const [ num, char ] = makeMove(board, turn);
    gameOver = checkWinner(board, char, num);
    if (gameOver) return playAgain();
    turn++;
  }

  console.log("🤝 The match is a draw...");
  playAgain();
}

play();
