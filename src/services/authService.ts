import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SignInUser, SignUpUser, UserToken } from "../types/authTypes";
import * as userRepository from "../repositories/userRepository";
import * as errorHandling from "../errors/errorHandling";

async function validateEmailConflict(user: SignUpUser) {
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

async function validateEmailAndPassword(user: SignInUser) {
  const userExist = await userRepository.findOneByEmail(user.email);

  const validatePassword = userExist && bcrypt.compareSync(user.password, userExist.password);

  if (!validatePassword) {
    throw errorHandling.unauthorized("Invalid e-mail or password.");
  }

  return userExist;
}

function generateToken(userId: string): string {
  const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret | undefined;

  if (!JWT_SECRET) {
    throw errorHandling.internalServer("JWT_SECRET environment variable not provided!");
  }

  const FIFTEEN_15_DAYS_IN_SECONDS: number = 60 * 60 * 24 * 15;

  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: FIFTEEN_15_DAYS_IN_SECONDS });
}

export async function signUp(user: SignUpUser) {
  await validateEmailConflict(user);

  const userWithHashedPassword = await hashPassword(user);

  await userRepository.insertOne(userWithHashedPassword);
}

export async function signIn(user: SignInUser): Promise<UserToken> {
  const { id } = await validateEmailAndPassword(user);

  return { token: generateToken(id) };
}
