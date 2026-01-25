export const create2DArray = (h, w, char) =>
  Array.from({ length: h }, () => Array(w).fill(char));

export const drawBricks = (bricks, grid) => {
  bricks.forEach((row, i) => {
    row.forEach((exists, j) => {
      if (exists) grid[i][j + 1] = "▭";
    });
  });
};

export const drawVaus = (vaus, grid) => {
  vaus.forEach(([y, x]) => {
    grid[y][x] = "▬";
  });
};

export const clearVaus = (vaus, grid) => {
  vaus.forEach(([y, x]) => {
    grid[y][x] = "_";
  });
};

export const showDisplay = (grid) => {
  const screen = grid.map((row) => row.join("")).join("\n");
  console.log(screen);
};
