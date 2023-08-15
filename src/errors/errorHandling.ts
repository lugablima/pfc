export function conflict(message = ""): Error {
  return {
    name: "conflict",
    message,
  };
}
