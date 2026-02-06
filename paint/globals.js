export const DISABLE_MOUSE = "\x1b[?1006l\x1b[?1003l";
export const DISABLE_DRAG_TRACKING = "\x1b[?1003l\x1b[?1006l";
export const ENABLE_MOUSE = "\x1b[?1006h\x1b[?1003h";
export const ENABLE_DRAG_TRACKING = "\x1b[?1003h\x1b[?1006h";

export const colorCodes = {
  red: "\x1b[41m \x1b[0m",
  green: "\x1b[42m \x1b[0m",
  yellow: "\x1b[43m \x1b[0m",
  blue: "\x1b[44m \x1b[0m",
  magenta: "\x1b[45m \x1b[0m",
  cyan: "\x1b[46m \x1b[0m",
  white: "\x1b[47m \x1b[0m",
};

export const colorPos = {};

export const writer = Deno.stdout.writable.getWriter();
export const encoder = new TextEncoder();
