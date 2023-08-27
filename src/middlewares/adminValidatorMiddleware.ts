import { Response, NextFunction } from "express";

import * as userRepository from "../repositories/userRepository";
import * as errorHandling from "../errors/errorHandling";

export default async function validateAdmin(_: any, res: Response, next: NextFunction) {
  const user = await userRepository.findOneById(res.locals.userId as string);

  if (!user) {
    throw errorHandling.notFound("User not found.");
  }

  if (!user.isAdmin) {
    throw errorHandling.unauthorized("User is not a admin.");
  }

  next();
}
