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

export async function findAllResolutionsByUser() {
  const resolutions = await prisma.user.findMany({
    include: {
      resolutions: {
        where: {
          exercise: {
            class: {
              isEnabled: true,
            },
          },
        },
      },
    },
    where: {
      isAdmin: false,
    },
  });

  return resolutions;
}
