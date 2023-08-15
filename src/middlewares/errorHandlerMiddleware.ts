import { Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandlerMiddleware(error: Error, _: any, res: Response, __: any) {
  if (error.name === "conflict") {
    return res.status(409).send(error.message);
  }

  return res.status(500).send(error);
}
