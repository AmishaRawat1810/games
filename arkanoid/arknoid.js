import { BRICKS, GRID, msg, VAUS } from "./src/global_var.js";
import { setUpEnv } from "./src/setup.js";
import { moveVaus } from "./src/vaus_fns.js";
import { getInput } from "./src/input.js";
import { showDisplay } from "./src/grid_bricks_fns.js";

const play = () => {
  setUpEnv(VAUS, BRICKS, GRID);
  console.error(msg);
  showDisplay(GRID);
  throwTheBall(GRID, BRICKS, VAUS);

  while (true) {
    console.clear();
    showDisplay(GRID);
    const direction = getInput();
    if (direction) moveVaus(VAUS, direction, GRID);
  }
};

play();
