Deno.stdin.setRaw(true, { cbreak: true });

const mapToKeyStroke = {
  "279165": "w",
  "279166": "s",
  "279167": "d",
  "279168": "a",
  "9700": "a",
  "11500": "s",
  "10000": "d",
  "11900": "w",
};

export const getInput = async () => {
  const buf = new Uint8Array(3);
  await Deno.stdin.read(buf);
  const keyStroke = buf.join("");
  return mapToKeyStroke[keyStroke];
};
