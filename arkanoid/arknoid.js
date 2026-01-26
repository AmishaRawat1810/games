import { setUpEnv } from "./src/setup.js";
import { getInput } from "./src/input.js";
import { brickPresent, showDisplay } from "./src/grid_bricks_fns.js";
import { throwEnergyBall } from "./src/energy_ball_fns.js";

const width = 100;
const height = 50;

const play = (height, width) => {
  const { grid, bricks, vaus, velocity, energyBall } = setUpEnv(height, width);
  const msg = "Use 'a' to move left, 'd' to move right, 'q' to quit";

  showDisplay(grid);
  getInput(vaus, grid);

  setInterval(() => {
    console.clear();
    const resume = throwEnergyBall(grid, bricks, vaus, energyBall, velocity) ??
      true;
    if (!resume || !brickPresent(bricks)) Deno.exit(0);
    showDisplay(grid);
    console.log(msg);
  }, 300);
};

play(height, width);
