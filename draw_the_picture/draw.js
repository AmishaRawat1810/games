import {
  DISABLE_MOUSE,
  ENABLE_MOUSE,
  HIDE_CURSOR,
  masterPalette,
  SHOW_CURSOR,
} from "./global.js";
import { drawOnTerminal, patterns } from "./utils.js";

const encode = (text) => new TextEncoder().encode(text);
let brush = 17;

const setUp = async (pattern = patterns.turtle) => {
  console.clear();
  const writer = Deno.stdout.writable.getWriter();
  await writer.write(encode(ENABLE_MOUSE));
  await writer.write(encode(HIDE_CURSOR));
  await drawOnTerminal(pattern, writer);

  for (let id = 0; id < masterPalette.length; id++) {
    const col = (id + 1) * 3;
    const output = id < 10 ? `${id}` : `${id} `;
    await writer.write(encode(`\x1b[${13};${col}H${output}`));
  }

  await writer.write(encode("\nPress 'q' or 'ctrl + c' to exit"));
  writer.releaseLock();
};

const addBg = (row, col, color, value) =>
  `\x1b[${row};${col}H${color}${value}\x1b[0m`;

const updateBrush = (col, row, prevId) => {
  const prevCol = (prevId + 1) * 3;

  for (let id = 0; id < masterPalette.length; id++) {
    const colStart = (id + 1) * 3;
    const colEnd = colStart + 1;
    if (col >= colStart && col <= colEnd) {
      brush = id;
      const clearPrev = addBg(row, prevCol, "\x1b[49m", prevId);
      const selected = addBg(row, colStart, "\x1b[48;5;244m", id);
      return { selected, clearPrev };
    }
  }
};

const handleInput = (match, controller) => {
  const [, button, colStr, rowStr] = match;
  const col = parseInt(colStr);
  const row = parseInt(rowStr);

  if (row === 13 && button === "0") {
    const { selected, clearPrev } = updateBrush(col, row, brush);
    controller.enqueue(clearPrev);
    controller.enqueue(selected);
  }

  if (button === "0" && row < 13) {
    controller.enqueue(`\x1b[${row};${col}H${masterPalette[brush]}`);
  }
};

const paint = new TransformStream({
  transform(chunk, controller) {
    if (chunk === "q") {
      controller.enqueue(DISABLE_MOUSE + SHOW_CURSOR);
      controller.terminate();
      return;
    }

    [...chunk.matchAll(/<(\d+);(\d+);(\d+)M/g)]
      .forEach((match) => handleInput(match, controller));
  },

  flush(controller) {
    controller.enqueue(DISABLE_MOUSE + SHOW_CURSOR);
  },
});

export const startPaint = async () => {
  try {
    await setUp();
    Deno.stdin.setRaw(true, { cbreak: true });
    await Deno.stdin.readable
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(paint)
      .pipeThrough(new TextEncoderStream())
      .pipeTo(Deno.stdout.writable);
  } catch (err) {
    console.error(err);
  }
};

await startPaint();
