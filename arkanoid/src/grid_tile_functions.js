import { movePlatform } from "./platform.js";

export const displayGrid = (array) => {
  const grid = array.map((row) => row.join("")).join("\n");
  console.log(grid);
};

export const create2DArray = (h, w, char) =>
  Array.from({ length: h }, (_) => Array(w).fill(char));

export const clearGrid = (mapper, grid) => {
  mapper.forEach((row, i) => {
    if (row.length === 2) grid[row[0]][row[1]] = "_";
    else {
      row.forEach((_value, j) => {
        grid[i][j + 1] = "_";
      });
    }
  });
};

export const writeOnGrid = (mapper, grid, char = "▭") => {
  mapper.forEach((row, i) => {
    if (row.length === 2) grid[row[0]][row[1]] = char;
    else {
      row.forEach((value, j) => {
        grid[i][j + 1] = value;
      });
    }
  });
};

export const moveTile = (move, GRID, PLATFORM) => {
  console.log("INSIDE MOVE TILE");
  const offsets = { "a": { dy: 0, dx: -1 }, "d": { dy: 0, dx: 1 } };

  if (offsets[move]) {
    movePlatform(PLATFORM, offsets[move], move, GRID);
  }
};
