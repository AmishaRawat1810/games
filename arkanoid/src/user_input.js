import { msg, VALIDKEYS } from "./global_var.js";

export async function getInput() {
  Deno.stdin.setRaw(true);
  console.log(msg);
  const buffer = new Uint8Array(4);
  let action = "";

  try {
    const nread = await Deno.stdin.read(buffer);
    const bytes = buffer.subarray(0, nread);
    const keyCode = bytes.toString();
    if (keyCode === "113") Deno.exit(0);
    action = VALIDKEYS[keyCode];
  } finally {
    Deno.stdin.setRaw(false);
  }
  return action;
}
