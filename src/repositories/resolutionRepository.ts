import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { TCreateResolutionPayload } from "../types/resolutionTypes";


export async function createOrUpdateOne(userId: string, exerciseId: string, data: TCreateResolutionPayload) {
  await prisma.resolution.upsert({
    where: { userId_exerciseId: { userId, exerciseId } },
    create: { userId, grade: data.grade, resolution: data.resolution as Prisma.JsonObject, exerciseId },
    update: { userId, grade: data.grade, resolution: data.resolution as Prisma.JsonObject, exerciseId },
  });
}
