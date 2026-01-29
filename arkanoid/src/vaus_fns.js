import { clearVaus, drawVaus } from "./grid_bricks_fns.js";

export const moveVaus = (vaus, dir, grid) => {
  const dx = dir === "a" ? -1 : 1;
  const left = vaus[0][1];
  const right = vaus[vaus.length - 1][1];

  if ((dx < 0 && left <= 1) || (dx > 0 && right >= grid[0].length - 2)) return;

  clearVaus(vaus, grid);
  vaus.forEach((p) => (p[1] += dx));
  drawVaus(vaus, grid);
};
