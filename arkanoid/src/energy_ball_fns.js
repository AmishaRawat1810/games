const throwTheBall = (grid, ball, prevPos, vaus) => {
  const [y, x] = [Math.floor(ball.y), Math.floor(ball.x)];
  clearBallTrace(grid, prevPos, vaus);
  grid[y][x] = "🔵";
};

const clearBallTrace = (grid, prevPos, vaus) => {
  const [y1, x1] = [Math.floor(prevPos.y), Math.floor(prevPos.x)];
  const isVausPart = vaus.some((paddle) =>
    paddle[0] === y1 && paddle[1] === x1
  );

  if (isVausPart) {
    grid[y1][x1] = "▬▬";
    return;
  }

  grid[y1][x1] = "  ";
};

const checkPaddleCollision = (vaus, ball, prevPos, velocity) => {
  const [vausY, vausXStart] = vaus[0];
  const vausXEnd = vaus[vaus.length - 1][1];
  const crossedY = prevPos.y < vausY && ball.y >= vausY;
  const withinX = ball.x >= vausXStart && ball.x <= vausXEnd;
  const hit = crossedY && withinX;

  if (hit) {
    const mid = vaus[Math.floor(vaus.length / 2)][1];
    const hitRatio = (ball.x - mid) / Math.floor(vaus.length / 2);
    velocity.dx = hitRatio * 0.5;
    velocity.dy *= -Math.abs(velocity.dy);
  }

  return hit;
};

const checkWallCollision = (grid, ball, velocity) => {
  if (ball.x <= 1 || ball.x >= grid[0].length - 2) {
    velocity.dx = -velocity.dx;
  }
  if (ball.y <= 1) {
    velocity.dy = -velocity.dy;
  }
};

const checkBrickCollision = (grid, bricks, ball, velocity) => {
  const y = Math.floor(ball.y);
  const x = Math.floor(ball.x);

  if (y < bricks.length && x < bricks[0].length && bricks[y][x]) {
    bricks[y][x] = false;
    grid[y][x] = "  ";
    velocity.dy = -velocity.dy;
    return true;
  }
  return false;
};

export const throwEnergyBall = (grid, bricks, vaus, ball, velocity) => {
  const prevPos = { x: ball.x, y: ball.y };

  ball.x += velocity.dx;
  ball.y += velocity.dy;

  if (ball.y >= grid.length - 1) {
    console.error("YOU LOST !");
    return false;
  }

  checkWallCollision(grid, ball, velocity);
  checkBrickCollision(grid, bricks, ball, velocity);
  checkPaddleCollision(vaus, ball, prevPos, velocity);

  throwTheBall(grid, ball, prevPos, vaus);
};
