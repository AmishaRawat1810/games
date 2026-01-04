const WIN_COMBINATIONS = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"],
];

let botMoves = [];
let opponentMoves = [];

function pad(count, string, char) {
  let paddedString = string.padStart(string.length + count, char);
  return paddedString;
}

function convertArrayToString(array) {
  const tempArray = [];

  for (let index = 0; index < array.length; index++) {
    let columnString = array[index].join("|");
    columnString = pad(5, columnString, " ");
    tempArray.push(columnString);
  }

  return tempArray.join("\n     ----|----|----\n");
}

function displayArray(array) {
  const convertedString = convertArrayToString(array);
  const paddedString = pad(2, convertedString, "\n");
  console.log(paddedString);
  console.log("\n \n")
}

function display(array) {
  displayArray(array);
  console.log("\n------------------------------------------\n")
}

function isWinningCombination(array, combination, char) {
  for (let i = 0; i < combination.length; i++) {
    const y = parseInt(combination[i][0]);
    const x = parseInt(combination[i][1]);
    if (array[y][x] !== char) return false;
  }
  return true;
}

function isPlayerWinner(array, char) {
  for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
    if (isWinningCombination(array, WIN_COMBINATIONS[i], char)) return true;
  }
  return false;
}

function updateArray(coordinates, array, char) {
  const yCoor = parseInt(coordinates[0]);
  const xCoor = parseInt(coordinates[1]);
  array[yCoor][xCoor] = char;
}

function isValidInput(playerInput) {
  return playerInput > 0 && playerInput < 10;
}

function getInput(playerName) {
  console.log("Enter the block number in order to chose the block");

  let playerInput = prompt(`Enter your choice ${playerName} : `);
  playerInput = parseInt(playerInput);

  if (isValidInput(playerInput)) {
    return playerInput;
  }

  console.log("❌ Invalid user Input, Try again \n");
  return getInput(playerName);
}

function getCoordinate(chosenBox) {
  const coordinates = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
  return coordinates[chosenBox - 1];
}

function checkIsBlockEmpty(array, playerChosenCoordinate) {
  const yCoor = parseInt(playerChosenCoordinate[0]);
  const xCoor = parseInt(playerChosenCoordinate[1]);
  const block = array[yCoor][xCoor];
  return block !== " ❌ " && block !== " 🟢 ";
}

function getChosenBlockPosition(playerName, array) {
  const playerChoice = getInput(playerName);
  const playerChosenCoordinate = getCoordinate(playerChoice);

  if (checkIsBlockEmpty(array, playerChosenCoordinate)) {
    return playerChosenCoordinate;
  }

  console.log("Position has already been occupied \n");
  return getChosenBlockPosition(playerName, array);
}

function moveBesideCenter(array, opponentLastMove) {
  let botMove = getCoordinate(10 - opponentLastMove);

  // play opposite block, beside center if opponent chose 1,2,3
  if (opponentLastMove < 4 && checkIsBlockEmpty(array, botMove)) {
    return botMove;
  }

  // play opposite block, beside center if opponent chose 4-9
  botMove = getCoordinate((opponentLastMove % 4) + 2);
  if (checkIsBlockEmpty(array, botMove)) {
    return botMove;
  }

  return -1;
}

function findBestCorner(array) {
  const corners = ["00", "02", "20", "22"];
  for (let index = 0; index < corners.length; index++) {
    if (checkIsBlockEmpty(array, corners[index])) {
      return corners[index];
    }
  }
  return -1;
}

function findWinningMove(array, playerSymbol) {
  for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
    let count = 0;
    let emptyPosition = null;

    for (let j = 0; j < 3; j++) {
      const pos = WIN_COMBINATIONS[i][j];
      const y = parseInt(pos[0]);
      const x = parseInt(pos[1]);

      if (array[y][x] === playerSymbol) {
        count++;
      } else if (checkIsBlockEmpty(array, pos)) {
        emptyPosition = pos;
      }
    }

    if (count === 2 && emptyPosition) {
      return emptyPosition;
    }
  }
  return -1;
}

function getBotPosition(array, turn) {
  const botSymbol = " ❌ ";
  const playerSymbol = " 🟢 ";
  const lastMove = opponentMoves[opponentMoves.length - 1];

  //Check if bot can win
  const botWinMove = findWinningMove(array, botSymbol);
  if (botWinMove !== -1) return botWinMove;
  
  //Block opponent winning position
  const opponentWinMove = findWinningMove(array, playerSymbol);
  if (opponentWinMove !== -1) return opponentWinMove;

  //Take the center
  const center = getCoordinate(5);
  if(checkIsBlockEmpty(array, center) && turn !== 1) {
    return center;
  }

  //Take any corner
  const nextMove = findBestCorner(array);
  if (nextMove !== -1) return nextMove;

  //Take the block beside center
  return moveBesideCenter(array, lastMove);
}

function startGame(array, p1Name, p2Name) {
  let turns = 8;
  let currentTurn = 1;
  display(array);

  const p1ChosenCoordinate = getBotPosition(array, currentTurn);
  botMoves.push(p1ChosenCoordinate);
  updateArray(p1ChosenCoordinate, array, " ❌ ");
  display(array);

  while (currentTurn <= turns) {
    const p2ChosenCoordinate = getChosenBlockPosition(p2Name, array);
    opponentMoves.push(p2ChosenCoordinate);
    updateArray(p2ChosenCoordinate, array, " 🟢 ");
    display(array);

    if (isPlayerWinner(array, " 🟢 ")) {
      console.log(`${p2Name} won the game 🎉🎉 \n`);
      return;
    }

    const p1ChosenCoordinate = getBotPosition(array, currentTurn);
    botMoves.push(p1ChosenCoordinate);
    updateArray(p1ChosenCoordinate, array, " ❌ ");
    display(array);

    if (isPlayerWinner(array, " ❌ ")) {
      console.log(`${p1Name} won the game 🎉🎉 \n`);
      return;
    }

    currentTurn += 2;
  }

  console.log("It was draw.");
}

function config() {
  const array = [
    [" 1  ", " 2  ", " 3 "],
    [" 4  ", " 5  ", " 6 "],
    [" 7  ", " 8  ", " 9 "],
  ];
  const p1Name = "The Omniscient Bot";
  const p2Name = prompt("Enter your name (p2) : ")

  console.log(`${p1Name} marker : " ❌ "`);
  console.log(`${p2Name} marker : " 🟢 "`);

  startGame(array, p1Name, p2Name);

  if (confirm("Do you wanna play again ? ")) {
    config();
  }
}

function main() {
  config();
}

main();
