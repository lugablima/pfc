export function conflict(message = ""): Error {
  return { name: "conflict", message };
}

export function unauthorized(message = ""): Error {
  return { name: "unauthorized", message };
}

export function internalServer(message = ""): Error {
  return { name: "internal_server_error", message };
}

export function badRequest(message = ""): Error {
  return { name: "bad_request", message };
}

export function notFound(message = ""): Error {
  return { name: "not_found", message };
}
