import { connections, send, sessions, userSession } from "./chat_state.js";
import { broadcastMsg } from "./chat_room.js";

let sessionCounter = 0;

export const getSessionRecipients = (sessionId) =>
  [...sessions.get(sessionId)].map((user) => [user, connections.get(user)]);

const announceSession = (sessionUsers) => {
  const msg = `
  ${"─".repeat(20)}\n[PRIVATE SESSION]\nMembers: ${sessionUsers.join(", ")}
  Type /leave to exit\n${"─".repeat(20)}\n\n`;

  const recipients = sessionUsers
    .map((u) => [u, connections.get(u)])
    .filter(([_, conn]) => conn);

  broadcastMsg(msg, recipients);
};

export const startSession = (username, conn, msg) => {
  const targetUsers = msg.split(" ").slice(1).concat(username);
  const validUsers = targetUsers.filter((user) => connections.has(user));

  if (validUsers.length < 2) return send(conn, "One or more user not found.\n");

  const id = `session_${sessionCounter++}`;
  sessions.set(id, new Set(validUsers));
  validUsers.forEach((user) => userSession.set(user, id));
  announceSession(valid);
};

export const leaveSession = (username, conn) => {
  const id = userSession.get(username);
  if (!id) return;

  const session = sessions.get(id);
  session.delete(username);
  userSession.delete(username);

  broadcastMsg(`${username} left the session.\n`, getSessionRecipients(id));
  if (session.size === 0) sessions.delete(id);

  send(conn, "Back to main chat.\n");
};
