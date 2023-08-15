import bcrypt from "bcrypt";

import { SignUpUser } from "../types/authTypes";
import * as userRepository from "../repositories/userRepository";
import * as errorHandling from "../errors/errorHandling";

export async function validateEmailConflict(user: SignUpUser) {
  const userExist = await userRepository.findOneByEmail(user.email);

  if (userExist) {
    throw errorHandling.conflict("This email is already registered.");
  }
}

async function hashPassword(user: SignUpUser) {
  const userClone = { ...user };

  const salt = await bcrypt.genSalt();
  userClone.password = await bcrypt.hash(user.password, salt);

  return userClone;
}

export async function signUp(user: SignUpUser) {
  await validateEmailConflict(user);

  const userWithHashedPassword = await hashPassword(user);

  await userRepository.insertOne(userWithHashedPassword);
}
