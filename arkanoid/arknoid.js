import { setUpEnv } from "./src/setup.js";
import { moveVaus } from "./src/vaus_fns.js";
import { getInput } from "./src/input.js";
import { showDisplay } from "./src/grid_bricks_fns.js";
import { throwTheBall } from "./src/energy_ball_fns.js";

const play = (height, width) => {
  const { grid, bricks, vaus, energyBall, velocity } = setUpEnv(height, width);
  const msg = "Use 'a' to move left, 'd' to move right, 'q' to quit";

  console.error(msg);
  showDisplay(grid);
  throwTheBall(grid, energyBall);

  while (true) {
    console.clear();
    showDisplay(grid);
    const direction = getInput();
    if (direction) moveVaus(vaus, direction, grid);
  }
};

const width = 52;
const height = 20;
play(height, width);
