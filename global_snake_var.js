import { createScreen } from "./board_functions.js";

export const board = createScreen(40, 40);
export const snake = { char: "*", body: [[30, 10], [31, 10], [32, 10]] };
export const heading = { a: [0, -1], w: [-1, 0], s: [1, 0], d: [0, 1] };
export const opposite = { s: "w", w: "s", a: "d", d: "a" };
