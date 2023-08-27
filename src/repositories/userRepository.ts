import { prisma } from "../config/prisma";
import { SignUpUser, TUser } from "../types/authTypes";

export async function findOneByEmail(email: string): Promise<TUser | null> {
  const result: TUser | null = await prisma.user.findUnique({ where: { email } });

  return result;
}

export async function findOneById(userId: string): Promise<TUser | null> {
  const result: TUser | null = await prisma.user.findUnique({ where: { id: userId } });

  return result;
}

export async function insertOne(user: SignUpUser) {
  await prisma.user.create({ data: user });
}
