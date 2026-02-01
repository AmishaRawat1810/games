export const connections = new Map(); // username => conn
export const sessions = new Map(); // sessionId => Set<username>
export const userSession = new Map(); // username => sessionId

export const encoder = new TextEncoder();
export const decoder = new TextDecoder();

export const send = (conn, text) => conn.write(encoder.encode(text));
