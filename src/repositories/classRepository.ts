import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";
import { ClassPayload, TClass } from "../types/classTypes";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function findOneByNameAndModuleId(_class: ClassPayload): Promise<TClass | null> {
  const registeredClass: TClass | null = await prisma.class.findUnique({
    where: { name_moduleId: { name: _class.name, moduleId: _class.moduleId } },
  });

  return registeredClass;
}

export async function insertOne(
  _class: ClassPayload,
  prismaTransaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
): Promise<void> {
  const db = prismaTransaction || prisma;

  await db.class.create({
    data: {
      name: _class.name,
      imageUrl: _class.imageUrl,
      moduleId: _class.moduleId,
      dueDate: _class.dueDate,
      video: {
        create: {
          url: _class.videoUrl,
        },
      },
      summary: {
        create: {
          url: _class.summaryUrl,
        },
      },
    },
  });
}
