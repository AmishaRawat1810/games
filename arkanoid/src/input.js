import { readKeypressSync } from "https://deno.land/x/keypress@0.0.11/mod.ts";
//CANT IMPORT THE jsr:@cliffy/keypress...
// no idea why T-T

export const getInput = () => {
  const VALIDKEYS = {
    "a": "a",
    "d": "d",
    "right": "d",
    "left": "a",
  };

  for (const keypress of readKeypressSync()) {
    if (keypress.key === "q") Deno.exit(0);
    return VALIDKEYS[keypress.key];
  }
};
