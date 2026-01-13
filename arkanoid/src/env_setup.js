import { writeOnGrid } from "./grid_tile_functions.js";

export const setUpEnv = (PLATFORM, TILES, GRID) => {
  writeOnGrid(TILES, GRID);
  writeOnGrid(PLATFORM, GRID);
};
