import { withinBoundary } from "./helperForSnake.js";

const solidLine = (w) => Array(w).fill("🟥");
const hollowLine = (w) => {
  const array = Array(w).fill("  ");
  array[0] = "🟥";
  array[w - 1] = "🟥";
  return array;
};

export const createScreen = (h, w) => {
  const arr = [];
  arr.push(solidLine(w));
  for (let i = 0; i < h; i++) {
    arr.push(hollowLine(w));
  }
  arr.push(solidLine(w));
  return arr;
};

export const displayScreen = (screen) => {
  screen = screen.map((row) => row.join("")).join("\n");
  console.log(screen);
};

export const drawOnDisplay = (snake, screen, char) => {
  snake.body.forEach(([y, x]) => {
    if (withinBoundary(screen, y, x)) {
      screen[y][x] = char;
    }
  });
};
