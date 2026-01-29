export const createGrid = (h, w, char = "#") => {
  const filledRow = Array(w).fill(char);
  const hollowRow = Array(w).fill(" ");

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

export const createBricks = ({
  rows,
  gridWidth,
  brickWidth = 2,
  gap = 1,
  margin = 2,
}) => {
  const usable = gridWidth - margin * 2;
  const perRow = Math.floor((usable + gap) / (brickWidth + gap));
  return Array.from({ length: rows }, () => Array(perRow).fill(true));
};

export const drawBricks = (bricks, grid) => {
  bricks.forEach((row, r) => {
    let x = 2;
    row.forEach((exists) => {
      if (exists) {
        grid[r + 1][x] = "=";
        grid[r + 1][x + 1] = "=";
      }
      x += 3;
    });
  });
};

export const drawVaus = (vaus, grid) => {
  vaus.forEach(([y, x]) => (grid[y][x] = "="));
};

export const clearVaus = (vaus, grid) => {
  vaus.forEach(([y, x]) => (grid[y][x] = " "));
};

export const showDisplay = (grid) =>
  console.log(grid.map((r) => r.join("")).join("\n"));

export const brickPresent = (bricks) => bricks.some((row) => row.some(Boolean));
