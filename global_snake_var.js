export const board = Array.from({ length: 4 }, () => Array(4).fill("-"));
export const snake = { char: "*", body: [[0, 1], [1, 1]] };
export const heading = { a: [0, -1], w: [-1, 0], s: [1, 0], d: [0, 1] };
export const opposite = { s: "w", w: "s", a: "d", d: "a" };