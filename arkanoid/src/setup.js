import {
  createBricks,
  createGrid,
  drawBricks,
  drawVaus,
} from "./grid_bricks_fns.js";

export const setUpEnv = (h, w) => {
  const paddleWidth = 8;
  const paddleY = h - 2;
  const paddleStartX = Math.floor((w - paddleWidth) / 2);

  const vaus = Array.from({ length: paddleWidth }, (_, i) => [
    paddleY,
    paddleStartX + i,
  ]);

  const velocity = { dx: 0.25, dy: 0.15 };
  const energyBall = { y: 6, x: w / 2 };

  const grid = createGrid(h, w);

  const bricks = createBricks({
    rows: 4,
    gridWidth: w,
  });

  drawBricks(bricks, grid);
  drawVaus(vaus, grid);

  return { bricks, grid, vaus, energyBall, velocity };
};
