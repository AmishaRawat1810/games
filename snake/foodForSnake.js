const frogPosition = { x: 0, y: 0 };

export const isFrogPresent = (screen) => {
  const { x, y } = frogPosition;
  return screen[y][x] === "🐸";
};

export const placeFrogs = (screen, min, max) => {
  if (isFrogPresent(screen)) return;
  const coordX = Math.ceil(Math.random() * (min + max) / 2);
  const coordY = Math.ceil(Math.random() * (min + max) / 2);

  if (screen[coordY][coordX] === "  ") {
    screen[coordY][coordX] = "🐸";
    frogPosition.x = coordX;
    frogPosition.y = coordY;
  } else placeFrogs(screen, min, max);
};
