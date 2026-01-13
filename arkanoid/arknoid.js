import { getInput } from "./src/user_input.js";
import { displayGrid, moveTile } from "./src/grid_tile_functions.js";
import { GRID, PLATFORM, TILES } from "./src/global_var.js";
import { setUpEnv } from "./src/env_setup.js";

const play = async (PLATFORM, TILES, GRID) => {
  setUpEnv(PLATFORM, TILES, GRID);
  displayGrid(GRID);

  while (true) {
    const move = await getInput();
    if (move) {
      console.clear();
      console.log({ move });
      moveTile(move, GRID, PLATFORM);
      displayGrid(GRID);
    }
  }
};

play(PLATFORM, TILES, GRID);
