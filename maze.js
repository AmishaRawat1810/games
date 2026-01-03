const maze3 = [
  '#####################################'.split(''),
  '# #  E #                 #     #    #'.split(''),
  '### # ### ### # # ##### ### # ### # #'.split(''),
  '#   #     # #   #   #   #   #   # # #'.split(''),
  '# # ####### ### # # # # ### ### # # #'.split(''),
  '# #       #     # # #   #   #   #   #'.split(''),
  '# ####### ##### ### ### ### ### #####'.split(''),
  '#       #     #     #     #   #      '.split(''),
  '#####################################'.split('')
];

function displayMaze (maze) {
  for (let i = 0; i < maze.length; i++) {
    let line = '';
    for (let j = 0; j < maze[i].length; j++) {
      line += maze[i][j];
    }
    console.log(line);
  }
}

function playerPositionAtStart (maze) {
  const randomIndex = Math.floor(Math.random() * 9);
  if (maze[randomIndex][randomIndex] !== '#') {
    maze[randomIndex][randomIndex] = '_';
    return [randomIndex, randomIndex];
  }
  return playerPositionAtStart(maze);
}

function operateOnCoordinate (playerCoordinate, y, x) {
  return [playerCoordinate[0] + y, playerCoordinate[1] + x];
}

function updatePosition (playerCoordinate, playerMove, maze) {
  const moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]; // W, S, A, D
  const movement = ['w', 's', 'a', 'd'];
  const [y, x] = moves[movement.indexOf(playerMove)] || [0, 0];

  const [newY, newX] = operateOnCoordinate(playerCoordinate, y, x);
  console.log(
    'Trying to move to:',
    newY,
    newX,
    '=>',
    `["${maze[newY][newX]}"]\n`
  );

  if (maze[newY][newX] !== '#') {
    console.log('Moved to :', newY, newX, '\n');
    return [newY, newX];
  }

  return playerCoordinate;
}

function movePlayer(maze, playerMove, playerCoordinate) {
  const [row, col] = playerCoordinate;
  maze[row][col] = ' ';

  const [newRow, newCol] = updatePosition(playerCoordinate, playerMove, maze);

  if (maze[newRow][newCol] !== '#') {
    playerCoordinate = [newRow, newCol];
  }

  const [r, c] = playerCoordinate;

  if (maze[r][c] !== 'E') {
    maze[r][c] = '_';
  }

  return playerCoordinate;
}


function play () {
  let [y, x] = playerPositionAtStart(maze3);
  displayMaze(maze3);

  while (true) {
    if (maze3[y][x] === 'E') {
      console.log('\n🎉 You won! Congratulations! 🎉\n');
      break;
    }

    const move = prompt('Enter your move (w/a/s/d): ');
    [y, x] = movePlayer(maze3, move, [y, x]);
    displayMaze(maze3);
  }
}

play();
