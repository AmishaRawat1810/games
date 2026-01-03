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

function diagonalCheck1(BOARD, move) {
  return BOARD[0][0] === move && BOARD[1][1] === move && BOARD[2][2] === move;
}

function diagonalCheck2(BOARD, move) {
  return BOARD[0][2] === move && BOARD[1][1] === move && BOARD[2][0] === move;
}

function horizontalCheck(BOARD, value) {
  return BOARD.some(row => row.every(cell => cell === value));
}

function verticalCheck(BOARD, value) {
  for (let i = 0; i < 3; i++) {
    if (
      BOARD[0][i] === value &&
      BOARD[1][i] === value &&
      BOARD[2][i] === value) {
      return true;
    }
  }
  return false;
}

function isWinner(BOARD, value) {
  return (
    diagonalCheck1(BOARD, value) ||
    diagonalCheck2(BOARD, value) ||
    horizontalCheck(BOARD, value) ||
    verticalCheck(BOARD, value)
  );
}

function placeValue(BOARD, tile, value, playerNumber) {
  const box = [
    [0,0], [0,1], [0,2],
    [1,0], [1,1], [1,2],
    [2,0], [2,1], [2,2]
  ];

  const [i, j] = box[tile - 1];
  if (BOARD[i][j] !== '') {
    console.log("❌ Tile is already filled!");
    return userInput(BOARD, playerNumber, value);
  }

  BOARD[i][j] = value;
}

function userInput(BOARD, playerNumber, value) {
  const response = parseInt(
    prompt(`Player ${playerNumber}:\nEnter the block number (1–9):`)
  );

  if (isNaN(response) || response < 1 || response > 9) {
    console.log("❌ Invalid input, try again!");
    return userInput(BOARD, playerNumber, value);
  }

  placeValue(BOARD, response, value, playerNumber);
  printBoard(BOARD);
  return response;
}

function checkWinner(BOARD, playerChar, playerNumber) {
  if (isWinner(BOARD, playerChar)) {
    console.log(`🎉 Player ${playerNumber} (${playerChar}) wins!`);
    return true;
  }
  return false;
}

function playAgain() {
  const confirmation = confirm('Do you want to play again?');
  confirmation ? play() : console.log("Thanks for playing 👋");
}

function currentPlayer(turn) {
  return turn % 2 === 0 ? [1, '❌'] : [2, '🟢'];
}

function makeMove(BOARD, turn) {
  const [num, char] = currentPlayer(turn);
  userInput(BOARD, num, char);
  return [num, char ];
}

function play() {
  const BOARD = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let turn = 0;
  let gameOver = false;

  while (turn < 9 && !gameOver) {
    printBoard(BOARD);
    const [ num, char ] = makeMove(BOARD, turn);
    gameOver = checkWinner(BOARD, char, num);
    if (gameOver) return playAgain();
    turn++;
  }

  console.log("🤝 The match is a draw...");
  playAgain();
}

play();
