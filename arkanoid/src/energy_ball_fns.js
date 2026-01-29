const drawBall = (grid, ball, prev, vaus) => {
  const py = Math.floor(prev.y);
  const px = Math.floor(prev.x);

  if (!vaus.some(([y, x]) => y === py && x === px)) {
    grid[py][px] = " ";
  }

  const y = Math.floor(ball.y);
  const x = Math.floor(ball.x);

  if (!vaus.some(([vy, vx]) => vy === y && vx === x)) {
    grid[y][x] = "o";
  }
};

const checkWallCollision = (ball, prev, velocity, width) => {
  if (prev.x > 1 && ball.x <= 1) {
    velocity.dx *= -1;
    ball.x = 1.01;
  }

  if (prev.x < width - 2 && ball.x >= width - 2) {
    velocity.dx *= -1;
    ball.x = width - 2.01;
  }

  if (prev.y > 1 && ball.y <= 1) {
    velocity.dy *= -1;
    ball.y = 1.01;
  }
};

const checkPaddleCollision = (vaus, ball, prev, velocity) => {
  const paddleY = vaus[0][0];
  const minX = vaus[0][1];
  const maxX = vaus[vaus.length - 1][1];
  const withinY = prev.y < paddleY && ball.y >= paddleY;
  const withinX = ball.x >= minX && ball.x <= maxX;

  if (withinY && withinX) {
    ball.y = paddleY - 0.01;
    velocity.dy = -Math.abs(velocity.dy);

    const mid = (minX + maxX) / 2;
    velocity.dx = (ball.x - mid) * 0.15;
    return true;
  }

  return false;
};

const checkBrickCollision = (grid, bricks, ball, velocity) => {
  const row = Math.floor(ball.y) - 1;
  if (row < 0 || row >= bricks.length) return false;

  const col = Math.floor((ball.x - 2) / 3);
  if (col < 0 || col >= bricks[0].length) return false;

  if (bricks[row][col]) {
    bricks[row][col] = false;
    grid[row + 1][2 + col * 3] = " "; //brick has 2 char so clears one
    grid[row + 1][3 + col * 3] = " "; //brick has 2 char so clears the other
    velocity.dy *= -1;
    return true;
  }
  return false;
};

export const throwEnergyBall = (grid, bricks, vaus, ball, velocity) => {
  const prev = { ...ball };

  ball.x += velocity.dx;
  ball.y += velocity.dy;

  checkWallCollision(ball, prev, velocity, grid[0].length);
  checkBrickCollision(grid, bricks, ball, velocity);

  const hitPaddle = checkPaddleCollision(vaus, ball, prev, velocity);

  if (!hitPaddle && ball.y >= grid.length - 1) {
    console.error("YOU LOST!");
    return false;
  }

  drawBall(grid, ball, prev, vaus);
};
