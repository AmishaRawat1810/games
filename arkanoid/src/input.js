import { VALIDKEYS } from "./global_var.js";
import { readKeypressSync } from "https://deno.land/x/keypress@0.0.11/mod.ts";

export const getInput = () => {
  for (const keypress of readKeypressSync()) {
    if (keypress.key === "q") Deno.exit(0);
    return VALIDKEYS[keypress.key];
  }
};
