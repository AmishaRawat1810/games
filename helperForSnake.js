import {  heading, opposite } from "./global_snake_var.js";

export const withinBoundary = (box, y, x) =>
  x < box[0].length && y < box.length && x >= 0 && y >= 0;

const isNotOccupied = (snake, y, x) =>
  !snake.body.some(([y1, x1]) => y1 === y && x1 === x);

export const isValidMove = (snake, box, y, x) =>
  withinBoundary(box, y, x) && isNotOccupied(snake, y, x);

export const updateDisplay = (box) => {
  box = box.map((row) => row.join(" ")).join("\n");
  console.log(box);
};

export const drawOnDisplay = (snake, box, char) => {
  snake.body.forEach(([y, x]) => {
    if (withinBoundary(box, y, x)) {
      box[y][x] = char;
    }
  });
};

export const moveSnake = (snake, newHead, box) => {
  drawOnDisplay(snake, box, "-");
  snake.body.unshift(newHead);
  snake.body.pop();
};

export const growSnake = (snake, dir) => {
  const [y1, x1] = [...snake.body].pop();
  const [y, x] = heading[opposite[dir]];
  const block = [y1 + y, x1 + x];
  snake.body.push(block);
};

export const executeMove = (snake, board, dir) => {
  const [dy, dx] = heading[dir];
  const head = snake.body[0];
  const newHead = [head[0] + dy, head[1] + dx];
  const status = isValidMove(snake, board, newHead[0], newHead[1]);

  if (status) {
    moveSnake(snake, newHead, board);
    drawOnDisplay(snake, board, "*");
  }

  return status;
};
