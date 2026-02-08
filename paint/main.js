import {
  colorCodes,
  DISABLE_DRAG_TRACKING,
  DISABLE_MOUSE,
  ENABLE_DRAG_TRACKING,
  ENABLE_MOUSE,
  encoder,
} from "./globals.js";
import { storeOptionsPos } from "./utils.js";

const colorPos = {};
let brush = colorCodes.red;
Deno.stdin.setRaw(true);

const setUp = async (colorPos) => {
  const writer = Deno.stdout.writable.getWriter();
  await writer.write(encoder.encode(ENABLE_MOUSE + ENABLE_DRAG_TRACKING));
  writer.releaseLock();
  storeOptionsPos(colorPos);
  console.log("Press 'ctrl + c' to exit.");
};

const paintTheBlock = (col, row, defaultColor, colorPos) => {
  for (const colour in colorPos) {
    const colorRow = colorPos[colour].row;
    const colorCol = colorPos[colour].col;

    if (row == colorRow && col >= colorCol[0] && col <= colorCol[1]) {
      brush = colorCodes[colour];
      return `\x1b[${row};${col}H${colorCodes[colour]}`;
    }
  }
  return `\x1b[${row};${col}H${defaultColor}`;
};

const showTheOptions = () => {
  const colors = Object.keys(colorCodes);
  const colorOptions = [];
  for (const key in colors) {
    const colorName = colorPos[colors[key]];
    const [row, col] = [colorName.row, colorName.col[0]];
    const colorTitlePos = `\x1b[${row};${col}H${colors[key]}`;

    colorOptions.push(colorTitlePos);
  }
  return colorOptions;
};

const paint = new TransformStream({
  transform(chunk, controller) {
    const menu = showTheOptions();
    menu.forEach((item) => controller.enqueue(item));

    if (chunk.includes("q")) {
      controller.enqueue(DISABLE_DRAG_TRACKING + DISABLE_MOUSE);
      controller.terminate();
      return;
    }

    const regex = /<(\d+);(\d+);(\d+)M/g;
    const matches = chunk.matchAll(regex);

    for (const match of matches) {
      const [_, button, col, row] = match;
      const color = paintTheBlock(col, row, brush, colorPos);
      if (["0", "32", "33", "34"].includes(button)) {
        controller.enqueue(color);
      }
    }
  },
  flush(controller) {
    controller.enqueue(DISABLE_DRAG_TRACKING + DISABLE_MOUSE);
  },
});

try {
  await setUp(colorPos);
  await Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(paint)
    .pipeThrough(new TextEncoderStream())
    .pipeTo(Deno.stdout.writable);
} catch (e) {
  console.error(e);
}
