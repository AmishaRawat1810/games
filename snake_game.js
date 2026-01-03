import { getInput } from "./mediatorForSnake.js";
import { drawOnDisplay, updateDisplay, executeMove} from "./helperForSnake.js";
import { board, snake } from "./global_snake_var.js";

// const updateSnakeBlock = ([y1, x1], move) => {
//   const [y2, x2] = directions[move];
//   const newBlock = [y1 + y2, x1 + x2];
//   snake.body.shift();
//   snake.body.unshift(newBlock);
// };

const start = (snake, board) => {
  drawOnDisplay(snake, board,"*");
  let status = true;

  const id = setInterval(() => {
    const move = getInput();

    console.clear();
    updateDisplay(board);
    if (!status || !"aswd".includes(move)) clearInterval(id);
    status = executeMove(snake, board, move);
    drawOnDisplay(snake, board, "*");
  }, 1000);
};

const id = setTimeout(() => {
  start(snake, board);
  clearTimeout(id);
}, 500);
