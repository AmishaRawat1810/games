import { masterPalette } from "./global.js";

export const storeOptionsPos = (colorPos) => {
  const ids = Object.keys(masterPalette);
  const row = 13;
  let currentCol = 1;

  ids.forEach((id) => {
    colorPos[id] = { row, col: [currentCol, currentCol + 1] };
    currentCol += 3;
  });
};
