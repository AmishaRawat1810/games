import { drawBricks, drawVaus } from "./grid_bricks_fns.js";

export const setUpEnv = (vaus, bricks, grid) => {
  drawBricks(bricks, grid);
  drawVaus(vaus, grid);
};
