import {
  DISABLE_DRAG_TRACKING,
  DISABLE_MOUSE,
  ENABLE_DRAG_TRACKING,
  ENABLE_MOUSE,
  masterPalette,
} from "./global.js";

const encode = (text) => new TextEncoder().encode(text);
const colorPos = {};

const state = {
  brush: masterPalette[17],
  isDrawing: false,
};

const setUp = async (colorPos) => {
  const writer = Deno.stdout.writable.getWriter();
  await writer.write(encode("\x1b[2J" + ENABLE_MOUSE + ENABLE_DRAG_TRACKING));
  storeOptionsPos(colorPos);

  for (const id in colorPos) {
    const { row, col } = colorPos[id];
    const color = masterPalette[id].ansi;
    await writer.write(encode(`\x1b[${row};${col[0]}H${color}`));
  }
  await writer.write(
    encode(`Press 'q' to exit | Current: ${state.brush.color}`),
  );

  writer.releaseLock();
};

// const paintTheBlock = (col, row, brush) => {
//   for (const color in colorPos) {
//     const colorRow = colorPos[color].row;
//     const colorCol = colorPos[color].col;
//     if ((row === colorRow) && (col >= colorCol[0] && col <= colorCol[1])) {
//       brush = masterPalette[color];
//       return `\x1b[${row};${col}H${brush}`;
//     }
//   }
//   return `\x1b[${row};${col}H${brush}`;
// };

const handleInput = (match, controller) => {
  const [, button, colStr, rowStr] = match;
  const [col, row] = [parseInt(colStr), parseInt(rowStr)];

  //FOR MENU
  if ((row === 13) )
};

const paint = new TransformStream({
  transform(chunk, controller) {
    if (chunk.includes("q")) {
      controller.enqueue(DISABLE_MOUSE + "\x1b[?25h\x1b[2J\x1b[H");
      return controller.terminate();
    }

    [...chunk.matchAll(/<(\d+);(\d+);(\d+)M/g)]
      .forEach((match) => handleInput(match, controller));
  },
});

const startPaint = async () => {
  try {
    await setUp(colorPos);
    await Deno.stdin.readable
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(paint)
      .pipeThrough(new TextEncoderStream())
      .pipeThrough(Deno.stdout.writable);
  } catch (err) {
    console.error(err.message);
  }
};

await startPaint();
