const paint = new TransformStream({
  transform(chunk, controller) {
    const menu = showTheOptions();
    menu.forEach((item) => controller.enqueue(item));

    if (chunk.includes("q")) {
      controller.enqueue(DISABLE_DRAG_TRACKING + DISABLE_MOUSE);

      setTimeout(() => controller.terminate(), 10);
      return;
    }

    const regex = /<(\d+);(\d+);(\d+)M/g;
    const matches = chunk.matchAll(regex);

    for (const match of matches) {
      const [_, button, col, row] = match;

      const coloredBlock = paintTheBlock(col, row, colorCodes.red, colorPos);

      if (["0", "32", "33", "34"].includes(button)) {
        controller.enqueue(coloredBlock);
      }
    }
  },
  flush(controller) {
    controller.enqueue(DISABLE_DRAG_TRACKING + DISABLE_MOUSE);
  },
});

const paintTheBlock = (col, row, defaultColor, colorPos) => {
  for (const colour in colorPos) {
    const colorRow = colorPos[colour].row;
    const colorCol = colorPos[colour].col;

    if (row == colorRow && col >= colorCol[0] && col <= colorCol[1]) {
      return `\x1b[${row};${col}H${colorCodes[colour]}█`;
    }
  }
  return `\x1b[${row};${col}H${defaultColor}█`;
};
