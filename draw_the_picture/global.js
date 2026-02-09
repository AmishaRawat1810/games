export const DISABLE_MOUSE = "\x1b[?1006l\x1b[?1003l";
export const DISABLE_DRAG_TRACKING = "\x1b[?1003l\x1b[?1006l";
export const ENABLE_MOUSE = "\x1b[?1006h\x1b[?1003h";
export const ENABLE_DRAG_TRACKING = "\x1b[?1003h\x1b[?1006h";

export const masterPalette = {
  0: { ansi: "\x1b[40m  \x1b[0m" }, //black
  1: { ansi: "\x1b[47m  \x1b[0m" }, //white
  2: { ansi: "\x1b[48;5;244m  \x1b[0m" }, //gray
  3: { ansi: "\x1b[48;5;211m  \x1b[0m" }, //pink
  4: { ansi: "\x1b[48;5;208m  \x1b[0m" }, //orange
  5: { ansi: "\x1b[48;5;215m  \x1b[0m" }, //lightOrange
  6: { ansi: "\x1b[42m  \x1b[0m" }, //green
  7: { ansi: "\x1b[48;5;22m  \x1b[0m" }, //darkGreen
  8: { ansi: "\x1b[44m  \x1b[0m" }, //blue
  9: { ansi: "\x1b[48;5;117m  \x1b[0m" }, //lightBlue
  10: { ansi: "\x1b[43m  \x1b[0m" }, //yellow
  11: { ansi: "\x1b[41m  \x1b[0m" }, //red
  12: { ansi: "\x1b[45m  \x1b[0m" }, //purple
  13: { ansi: "\x1b[48;5;94m  \x1b[0m" }, //brown
  14: { ansi: "\x1b[48;5;250m  \x1b[0m" }, //lightGray
  15: { ansi: "\x1b[48;5;130m  \x1b[0m" }, //lightBrown
  16: { ansi: "\x1b[48;5;18m  \x1b[0m" }, //darkBlue
  17: { ansi: "\x1b[0m  \x1b[0m" }, //eraser
};

export const encoder = new TextEncoder();
