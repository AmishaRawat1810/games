//CANT IMPORT THE jsr:@cliffy/keypress...
// no idea why T-T
import { moveVaus } from "./vaus_fns.js";
import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts";

export const getInput = async (vaus, grid) => {
  for await (const keypress of readKeypress()) {
    if (keypress.key === "q") Deno.exit();
    const direction =
      { "a": "a", "d": "d", "right": "d", "left": "a" }[keypress.key];
    if (direction) moveVaus(vaus, direction, grid);
  }
};
