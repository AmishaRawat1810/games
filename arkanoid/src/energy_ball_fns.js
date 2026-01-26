export const anyBrickPresent = (BRICKS) => BRICKS.some((brick) => brick);

export const wallCollision = (GRID, BRICKS) => {
  energyBall.x += velocity.dx;
  energyBall.y += velocity.dy;

  const [y, x] = [Math.floor(energyBall.y), Math.floor(energyBall.x)];
  const sideWall = x <= 0 || x >= GRID[0].length - 1;
  const topWall = y <= 0;
  const bottomWall = y >= GRID.length - 1;
  const isBrick = GRID[y][x] !== "_";

  if (sideWall) {
    velocity.dx = -velocity.dx;
  }

  if (topWall) {
    velocity.dy = -velocity.dy;
  }

  if (bottomWall) {
    //game over
    return false;
  }

  if (isBrick) {
    BRICKS[y][x] = false;
    GRID[y][x] = "_";
    velocity.dy = -velocity.dy;
  }
};

export const throwTheBall = (grid, energyBall) => {
  const [y, x] = [energyBall.x, energyBall.y];
  grid[y][x] = "⏺";
};
