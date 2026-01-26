import { drawBricks, drawVaus } from "./grid_bricks_fns.js";
import { create2DArray } from "./grid_bricks_fns.js";

export const setUpEnv = (height, width) => {
  const energyBall = { x: height / 2, y: width / 2 };
  const velocity = { dx: 2, dy: 2 };
  const grid = create2DArray(height, width, "_");
  const bricks = create2DArray(Math.floor(height / 4), width - 2, true);
  const vaus = [
    [height - 1, 2],
    [height - 1, 3],
    [height - 1, 4],
    [height - 1, 5],
    [height - 1, 6],
  ];
  drawBricks(bricks, grid);
  drawVaus(vaus, grid);
  return { bricks, grid, vaus, energyBall, velocity };
};
