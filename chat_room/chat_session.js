import { connections, send, sessions, userSession } from "./chat_state.js";
import { broadcastMsg } from "./chat_room.js";

let sessionCounter = 0;

export const getSessionRecipients = (sessionId) =>
  [...sessions.get(sessionId)].map((user) => [user, connections.get(user)]);

export const startSession = (username, conn, msg) => {
  const targetUsers = msg.split(" ").slice(1).concat(username);
  const validUsers = targetUsers.filter((user) => connections.has(user));

  if (validUsers.length < 2) return send(conn, "One or more user not found.\n");

  const id = `session_${sessionCounter++}`;
  sessions.set(id, new Set(validUsers));
  validUsers.forEach((user) => userSession.set(user, id));

  broadcastMsg(
    `[PRIVATE] Members: ${validUsers.join(", ")}\n`,
    getSessionRecipients(id),
  );
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
