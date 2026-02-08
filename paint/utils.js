import { colorCodes } from "./globals.js";

export const storeOptionsPos = (colorPos) => {
  const colors = [...Object.keys(colorCodes)];
  let prevColorEnd = 0;
  const row = 35;
  colors.forEach((color) => {
    const cStart = prevColorEnd + 2;
    const cEnd = cStart + color.length;
    colorPos[color] = { row, col: [cStart, cEnd] };
    prevColorEnd = cEnd;
  });
};
