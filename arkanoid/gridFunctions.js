const display = (array) => array.map((row) => row.join("")).join("\n");
const create2DArray = (h, w, char) =>
  Array.from({ length: h }, (_) => Array(w).fill(char));

const writeOnGrid = (mapper, grid, char = "▭") => {
  mapper.forEach((row, i) => {
    if (row.length === 2) grid[row[0]][row[1]] = char;
    else {
      row.forEach((value, j) => {
        grid[i][j + 1] = value;
      });
    }
  });
};

const platform = [[39, 19], [39, 20], [39, 21], [39, 22], [39, 23]];

const grid = create2DArray(40, 52, " ");
const tiles = create2DArray(5, 50, "▬");
writeOnGrid(tiles, grid);
writeOnGrid(platform, grid);
console.log(display(grid));
// console.log(display(tiles));
