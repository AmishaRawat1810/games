import { createGrid, drawBricks, drawVaus } from "./grid_bricks_fns.js";

export const setUpEnv = (h, w) => {
  const vaus = [[h - 2, 2], [h - 2, 3], [h - 2, 4], [h - 2, 5], [h - 2, 6]];
  const velocity = { dx: 0, dy: 1 };
  const energyBall = { y: Math.floor(h / 2), x: Math.floor(w / 2) };

  const grid = createGrid(h, w);
  const bricks = Array.from(
    { length: Math.floor(h / 4) },
    () => Array(w - 2).fill(true),
  );

  drawBricks(bricks, grid);
  drawVaus(vaus, grid);

  return { bricks, grid, vaus, energyBall, velocity };
};
