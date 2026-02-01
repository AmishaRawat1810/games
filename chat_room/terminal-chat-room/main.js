import { broadcastMsg, listUsers } from "./chat_room.js";
import {
  getSessionRecipients,
  leaveSession,
  startSession,
} from "./chat_session.js";
import { connections, decoder, send, userSession } from "./chat_state.js";

const handlers = {
  "/exit": () => false,
  "/list": (user, conn) => {
    listUsers(user, conn);
    return true;
  },
  "/session": (user, conn, msg) => {
    startSession(user, conn, msg);
    return true;
  },
  "/leave": (user, conn) => {
    leaveSession(user, conn);
    return true;
  },
};

const handleInput = async (username, conn, msg) => {
  const command = Object.keys(handlers).find((cmd) => msg.startsWith(cmd));
  if (command) return handlers[command](username, conn, msg);

  const sessionId = userSession.get(username);
  if (sessionId) {
    const recipients = getSessionRecipients(sessionId);
    broadcastMsg(`DM [${username}]: ${msg}\n`, recipients, username);
  } else {
    broadcastMsg(`[${username}]: ${msg}\n`, connections, username);
  }

  return true;
};

const setupUser = async (conn) => {
  await send(conn, getWelcomeBanner());
  const buf = new Uint8Array(64);
  const n = await conn.read(buf);
  if (!n) return null;

  const name = decoder.decode(buf.subarray(0, n)).trim();
  if (!name || connections.has(name)) {
    await send(conn, "Invalid username.\n");
    return null;
  }
  return name;
};

const handleConnection = async (conn) => {
  const username = await setupUser(conn);
  if (!username) return;

  connections.set(username, conn);
  broadcastMsg(`${username} joined.\n`, connections, username);

  try {
    await conn.readable
      .pipeThrough(new TextDecoderStream())
      .pipeTo(
        new WritableStream({
          async write(chunk) {
            const success = await handleInput(username, conn, chunk.trim());
            if (!success) throw new Error("EXIT");
          },
        }),
      );
  } catch (err) {
    if (err.message !== "EXIT" && !(err instanceof Deno.errors.BadResource)) {
      console.error(`Unexpected error for ${username}:`, err);
    }
  } finally {
    connections.delete(username);
    leaveSession(username, conn);
    broadcastMsg(`${username} has left the Room.\n`, connections, username);
    try {
      conn.close();
    } catch {}
  }
};

const getWelcomeBanner = () => `
${"=".repeat(40)}
   Welcome to the Chat Room
${"-".repeat(40)}
 /list    - See who's here
 /session - Private chat
 /exit    - Leave
${"=".repeat(40)}
Enter username: `;

const server = Deno.listen({ port: 8000 });
for await (const conn of server) handleConnection(conn);
