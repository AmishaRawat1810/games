import { drawOnGrid } from "./grid_tile_fns.js";

export const setUpEnv = (PLATFORM, TILES, GRID) => {
  drawOnGrid(TILES, GRID); //draws the tile
  drawOnGrid(PLATFORM, GRID); //draws the platform
};
