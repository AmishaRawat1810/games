import { clearVaus, drawVaus } from "./grid_bricks_fns.js";

export const moveVaus = (vaus, direction, grid) => {
  const dx = direction === "a" ? -1 : 1;
  const leftEdge = vaus[0][1];
  const rightEdge = vaus[vaus.length - 1][1];

  if (
    (direction === "a" && leftEdge <= 0) ||
    (direction === "d" && rightEdge >= grid[0].length - 2)
  ) return;

  direction === "a" ? vaus[0] : vaus[vaus.length - 2];

  clearVaus(vaus, grid);
  vaus.forEach((segment) => (segment[1] += dx));
  drawVaus(vaus, grid);
};
