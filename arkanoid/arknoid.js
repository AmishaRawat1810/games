import { getInput } from "./src/user_input.js";
import { displayGrid, movePlatformInGrid } from "./src/grid_tile_fns.js";
import { GRID, PLATFORM, TILES } from "./src/global_var.js";
import { setUpEnv } from "./src/env_setup.js";

const play = async (PLATFORM, TILES, GRID) => {
  setUpEnv(PLATFORM, TILES, GRID);

  while (true) {
    console.clear();
    displayGrid(GRID);
    const move = await getInput();
    if (move) {
      console.clear();
      console.log({ move });
      movePlatformInGrid(move, GRID, PLATFORM);
      displayGrid(GRID);
    }
  }
};

play(PLATFORM, TILES, GRID);
