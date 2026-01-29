export const placeSprite = (grid, y, x, sprite) => {
  for (let i = 0; i < sprite.length; i++) {
    for (let j = 0; j < sprite[i].length; j++) {
      if (grid[y + i] && grid[y + i][x + j] !== undefined) {
        if (sprite[i][j] !== " ") {
          grid[y + i][x + j] = sprite[i][j];
        }
      }
    }
  }
};

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

export const drawGrassOnGrid = (grid, grass) => {
  const limit = grid.length - 1;
  grass.forEach((row, i) => {
    row.forEach((weed, j) => {
      grid[limit - i][j] = weed;
    });
  });
};

export const displayGrid = (grid) => {
  const screen = grid.map((row) => row.join("")).join("\n");
  console.log(screen);
};

export const createGrass = (h, w, char = "🟩") => {
  return Array.from({ length: h }, () => Array(w).fill(char));
};
