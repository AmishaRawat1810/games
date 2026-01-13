import { create2DArray } from "./grid_tile_functions.js";

export const PLATFORM = [[19, 2], [19, 3], [19, 4], [19, 5], [19, 6]];
export const GRID = create2DArray(20, 52, "_");
export const TILES = create2DArray(5, 50, "▬");
export const VALIDKEYS = {
  "97": "a",
  "100": "d",
  "113": "quit",
  "27,91,67": "d",
  "27,91,68": "a",
};

export const msg = `
  -> a     : LEFT
  -> d     : RIGHT
  -> q     : QUIT
  `;
