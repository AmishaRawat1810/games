import { getInput } from "./mediatorForSnake.js";
import { executeMove } from "./helperForSnake.js";
import { displayScreen, drawOnDisplay } from "./board_functions.js";
import { board, snake } from "./global_snake_var.js";

const start = (snake, board) => {
  drawOnDisplay(snake, board, "*");
  let status = true;

  const id = setInterval(() => {
    const move = getInput();
    console.clear();
    displayScreen(board);
    if (!status || !"aswd".includes(move)) clearInterval(id);
    status = executeMove(snake, board, move);
    drawOnDisplay(snake, board, "*");
  }, 1000);
};

const id = setTimeout(() => {
  start(snake, board);
  clearTimeout(id);
}, 500);
