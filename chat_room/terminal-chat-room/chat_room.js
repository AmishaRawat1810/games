import { connections, encoder, send } from "./chat_state.js";

export const broadcastMsg = (msg, recipients, sender) => {
  const encodedMsg = encoder.encode(msg);
  for (const [username, conn] of recipients) {
    if (username !== sender) {
      conn.write(encodedMsg).catch(() => recipients.delete(username));
    }
  }
};

export const listUsers = (username, conn) => {
  const list = [...connections.keys()].filter((user) => user !== username);
  return send(conn, `Active users: ${list || "None"}\n`);
};
