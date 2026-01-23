import { getInput } from "./mediatorForSnake.js";
import { executeMove } from "./helperForSnake.js";
import { displayScreen, drawOnDisplay } from "./board_functions.js";
import { max, min, screen, snake } from "./global_snake_var.js";
import { placeFrogs } from "./foodForSnake.js";

const start = async (snake, screen) => {
  drawOnDisplay(snake, screen, snake.char);
  displayScreen(screen);
  let gameContinue = true;

  while (gameContinue) {
    console.clear();
    placeFrogs(screen, min, max);
    displayScreen(screen);
    const move = await getInput();
    if (!"aswd".includes(move)) gameContinue = false;
    gameContinue = executeMove(snake, screen, move);
    drawOnDisplay(snake, screen, "🟩");
  }
};

await start(snake, screen);
