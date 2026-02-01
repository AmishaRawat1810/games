const port = 8000;
const transport = "tcp";
const host = await Deno.connect({ port, transport });

const reader = Deno.stdin.readable.getReader();
const writer = Deno.stdout.writable.getWriter();

const write = async () => {
  while (true) {
    const data = await reader.read();
    await host.write(data.value);
  }
};

const read = async () => {
  while (true) {
    const buffer = new Uint8Array(1024);
    await host.read(buffer);
    await writer.write(buffer);
  }
};

const main = () => {
  write();
  read();
};

main();
