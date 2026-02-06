import {
  colorCodes,
  colorPos,
  ENABLE_DRAG_TRACKING,
  ENABLE_MOUSE,
  encoder,
  writer,
} from "./globals.js";
import { cleanUp, storeOptionsPos } from "./utils.js";

Deno.stdin.setRaw(true);

const setUp = async (colorPos) => {
  await writer.write(encoder.encode(ENABLE_MOUSE + ENABLE_DRAG_TRACKING));
  storeOptionsPos(colorPos);
  console.clear();
  console.log("Press 'ctrl + c' to exit.");
};

const paintTheBlock = (col, row, color, colorPos) => {
  for (const colour in colorPos) {
    const colorRow = colorPos[colour].row;
    const colorCol = colorPos[colour].col;
    const withinY = colorCol[1] >= col && colorCol[0] <= col;
    if (colorRow && withinY) {
      return `\x1b[${row};${col}H${colour}`;
    }
  }
  return `\x1b[${row};${col}H${color}`;
};

// const showTheOptions = () => {
//   const colors = Object.keys(colorCodes);
//   const pos = [];
//   for (const key in colors) {
//     const colorName = colorPos[colors[key]];
//     const [row, col] = [colorName.row, colorName.col[0]];
//     const colorTitlePos = `\x1b[${row};${col}H${colors[key]}`;
//     pos.push(colorTitlePos);
//   }
//   return pos;
// };

const paint = new TransformStream({
  transform(chunk, controller) {
    const regex = /<(\d+);(\d+);(\d+)M/g;
    const matches = chunk.matchAll(regex);
    for (const match of matches) {
      const [_, button, col, row] = match;
      const coloredBlock = paintTheBlock(col, row, colorCodes.red, colorPos);
      if (["0", "32", "33", "34"].includes(button)) {
        controller.enqueue(coloredBlock);
      }
    }
    // const colorMenu = showTheOptions();
    // controller.enqueue(colorMenu);
  },
});

try {
  await setUp(colorPos);
  await Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(paint)
    .pipeThrough(new TextEncoderStream())
    .pipeTo(
      new WritableStream({
        write(chunk) {
          Deno.stdout.write(chunk), { preventClose: true };
        },
      }),
    );
} catch (e) {
  console.error(e);
} finally {
  Deno.stdin.setRaw(false);
  await cleanUp();
}
