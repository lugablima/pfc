export function conflict(message = ""): Error {
  return { name: "conflict", message };
}

export function unauthorized(message = ""): Error {
  return { name: "unauthorized", message };
}

export function internalServer(message = ""): Error {
  return { name: "internal_server_error", message };
}
