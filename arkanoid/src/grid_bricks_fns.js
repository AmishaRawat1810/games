export const createGrid = (h, w, char = "🟥") => {
  const filledRow = Array(w).fill(char);
  const hollowRow = Array(w).fill("  ");
  hollowRow[0] = char;
  hollowRow[w - 1] = char;

  const grid = [];
  for (let i = 0; i < h; i++) {
    if (i === 0 || i === h - 1) {
      grid.push([...filledRow]);
    } else {
      grid.push([...hollowRow]);
    }
  }
  return grid;
};

export const drawBricks = (bricks, grid) => {
  bricks.forEach((row, i) => {
    row.forEach((exists, j) => {
      if (exists) grid[i + 1][j + 1] = "▭▭";
    });
  });
};

export const drawVaus = (vaus, grid) => {
  vaus.forEach(([y, x]) => {
    grid[y][x] = "▬▬";
  });
};

export const clearVaus = (vaus, grid) => {
  vaus.forEach(([y, x]) => {
    grid[y][x] = "  ";
  });
};

export const showDisplay = (grid) => {
  const screen = grid.map((row) => row.join("")).join("\n");
  console.log(screen);
};

export const brickPresent = (bricks) =>
  bricks.some((row) => row.some((exists) => exists));
