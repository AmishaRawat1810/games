Deno.stdin.setRaw(true, { cbreak: true });

export const VALIDKEYS = {
  "97": "a\n",
  "100": "d\n",
  "27,91,67": "right\n",
  "27,91,68": "left\n",
};

export const msg = `
  -> w     : FORWARD
  -> s     : BACKWARD
  -> a     : LEFT
  -> d     : RIGHT
  -> space : JUMP
  -> enter : SHOOT

  TO EXIT : PRESS Q!
  `;

async function getInput() {
  const buffer = new Uint8Array(3);
  const decoder = new TextDecoder();
  console.log(msg);

  while (true) {
    const nread = await Deno.stdin.read(buffer);
    const bytes = buffer.subarray(0, nread);
    const keyString = decoder.decode(bytes);

    if (keyString === "q") Deno.exit(0);

    const keyCode = bytes.toString();

    if (keyCode in VALIDKEYS) {
      const response = VALIDKEYS[keyCode];
      await Deno.stdout.write(new TextEncoder().encode(response));
    }
  }
}

await getInput();
