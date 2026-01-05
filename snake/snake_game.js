import { getInput } from "./mediatorForSnake.js";
import { executeMove } from "./helperForSnake.js";
import { displayScreen, drawOnDisplay } from "./board_functions.js";
import { max, min, screen, snake } from "./global_snake_var.js";
import { placeFrogs } from "./foodForSnake.js";

const start = (snake, screen) => {
  drawOnDisplay(snake, screen, snake.char);
  let status = true;

  const id = setInterval(() => {
    placeFrogs(screen, min, max);
    const move = getInput();
    console.clear();
    displayScreen(screen);
    if (!status || !"aswd".includes(move)) clearInterval(id);
    status = executeMove(snake, screen, move);
    drawOnDisplay(snake, screen, "🟩");
  }, 1000);
};

const id = setTimeout(() => {
  start(snake, screen);
  clearTimeout(id);
}, 500);
