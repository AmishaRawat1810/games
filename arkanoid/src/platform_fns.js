import { clearGrid, drawOnGrid } from "./grid_tile_fns.js";

export const movePlatform = (PLATFORM, { dy, dx }, move, GRID) => {
  clearGrid(PLATFORM, GRID);

  const isLeft = move === "a";
  const head = isLeft ? PLATFORM[0] : PLATFORM[PLATFORM.length - 1];
  const newPart = [head[0] + dy, head[1] + dx];

  if (isLeft) {
    PLATFORM.unshift(newPart);
    PLATFORM.pop();
  } else {
    PLATFORM.push(newPart);
    PLATFORM.shift();
  }
  drawOnGrid(PLATFORM, GRID);
};
