import { create2DArray } from "./grid_bricks_fns.js";

export const VAUS = [[19, 2], [19, 3], [19, 4], [19, 5], [19, 6]];
export const GRID = create2DArray(20, 52, "_");
export const BRICKS = create2DArray(5, 50, true);

export const VALIDKEYS = {
  "a": "a",
  "d": "d",
  "right": "d",
  "left": "a",
};

export const msg = "Use 'a' to move left, 'd' to move right, 'q' to quit";
