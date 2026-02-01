const encoder = new TextEncoder();
const port = 8000;
const transport = "tcp";
const listener = Deno.listen({ port, transport });
const reader = await Deno.stdin.readable.getReader();
const writer = Deno.stdout.writable.getWriter();

const processInput = async (conn, username) => {
  const buffer = new Uint8Array(1024);

  while (true) {
    const nBytes = await conn.read(buffer);
    const response = new Uint8Array(nBytes + username.length);
    const msg = buffer.subarray(0, nBytes);
    response.set(username, 0);
    response.set(msg, username.length - 1);
    await writer.write(response);
  }
};

const processOutput = async (conn, _name) => {
  while (true) {
    const input = await reader.read();
    await conn.write(input.value);
  }
};

const main = async () => {
  try {
    for await (const conn of listener) {
      console.log("Connected");
      const buffer = new Uint8Array(128);
      await conn.write(encoder.encode("Enter your username -> "));
      const nBytes = await conn.read(buffer);
      const name = buffer.slice(0, nBytes);

      processInput(conn, name);
      processOutput(conn, name);
    }
  } finally {
    listener.close();
  }
};

await main();
