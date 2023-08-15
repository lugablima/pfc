import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as errorHandling from "../errors/errorHandling";
import { JWTPayload } from "../types/authTypes";

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const authorization: string | undefined = req.header("Authorization");

  if (!authorization || !authorization.includes("Bearer ")) {
    throw errorHandling.badRequest("The token was not sent!");
  }

  const token: string = authorization.replace("Bearer ", "").trim();

  if (!token) {
    throw errorHandling.badRequest("The token was not sent!");
  }

  const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret | undefined;

  if (!JWT_SECRET) {
    throw errorHandling.internalServer("JWT_SECRET environment variable not provided!");
  }

  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as JWTPayload;

    res.locals.userId = userId;

    next();
  } catch (error) {
    if ((error as Error).name === "JsonWebTokenError") {
      throw errorHandling.unauthorized("Invalid token.");
    }

    if ((error as Error).name === "TokenExpiredError") {
      throw errorHandling.unauthorized("Expired token.");
    }

    throw error;
  }
}
