export const isFrogPresent = (screen) => {
  const s = screen.map((x) => x.join("").includes("🐸"));
  return s.some((x) => x);
};

export const placeFrogs = (screen, min, max) => {
  if (isFrogPresent(screen)) return;
  const coordX = Math.ceil(Math.random() * (min + max) / 2);
  const coordY = Math.ceil(Math.random() * (min + max) / 2);

  if (screen[coordY][coordX] === "  ") screen[coordY][coordX] = "🐸";
  else placeFrogs(screen, min, max);
};
