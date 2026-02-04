import {
  createGrass,
  createGrid,
  displayGrid,
  drawGrassOnGrid,
  placeSprite,
} from "./bg_env_fns.js";

const DINO_SPRITE = [
  [" ", "▄", "▆", " "],
  [" ", "█", "█", "█"],
  [" ", "┻", " ", "┻"],
];

const HURDLE_SPRITE = [
  [" ", " ", "🌵", " "],
  [" ", "▙", "█", "▟"],
  [" ", " ", "┃", " "],
];

let hurdleX = 17;

export const playGame = () => {
  const grid = createGrid(20, 20, " ");
  const grass = createGrass(2, 20, "🟩");
  drawGrassOnGrid(grid, grass);

  hurdleX -= 1;
  if (hurdleX <= 1) hurdleX = 35;

  placeSprite(grid, 14, 5, DINO_SPRITE);
  placeSprite(grid, 15, hurdleX, HURDLE_SPRITE);

  console.clear();
  displayGrid(grid);
};
