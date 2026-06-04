export const patterns = {
  turtle: `0 0 0 6 6 6 6 0 0 0
0 6 6 7 7 7 7 6 6 0
6 7 7 13 13 13 13 7 7 6
6 7 13 10 4 4 10 13 7 6
6 7 13 4 11 11 4 13 7 6
6 7 13 10 4 4 10 13 7 6
0 6 7 13 10 10 13 7 6 0
0 0 6 7 13 13 7 6 0 0
0 6 6 6 6 6 6 6 6 0
6 6 6 6 6 6 6 6 6 6`,
};

export const drawOnTerminal = async (patternStr, writer, limit = 10) => {
  const encoder = new TextEncoder();
  const pixelArt = patternStr.trim()
    .split("\n")
    .map((row) => row.trim().split(" ").map(Number));

  for (let row = 0; row < limit; row++) {
    for (let col = 0; col < limit; col++) {
      const pixel = pixelArt[row][col];
      await writer.write(
        encoder.encode(`\x1b[${row + 1};${col * 3 + 1}H${pixel}`),
      );
    }
  }
};

export const reDraw = async (pixelArt, pattern) => {
  const isCompleted = pixelArt.every((row, y) =>
    row.every((cell, x) => cell === pattern[y][x])
  );
  const patterns = Object.keys(patterns);
  if (isCompleted) {
    await startPaint(patterns);
  }
};
