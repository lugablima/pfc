import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";
import { ClassPayload, GetAllClasses, TClass } from "../types/classTypes";
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

export async function getAll(moduleId: string): Promise<GetAllClasses[] | null> {
  const classes: GetAllClasses[] | null = await prisma.class.findMany({
    where: { moduleId },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, imageUrl: true, isEnabled: true, moduleId: true, dueDate: true },
  });

  return classes;
}

export async function findOneById(classId: string): Promise<GetAllClasses | null> {
  const classFounded = await prisma.class.findUnique({
    where: { id: classId },
  });

  return classFounded;
}

export async function findOneByIdAndIsEnabled(classId: string, isEnabled: boolean): Promise<GetAllClasses | null> {
  const classFounded = await prisma.class.findUnique({
    where: { id: classId, AND: { isEnabled } },
  });

  return classFounded;
}

export async function updateOneIsEnabled(moduleId: string, isEnabled: boolean): Promise<GetAllClasses> {
  const classUpdated = await prisma.class.update({
    where: { id: moduleId },
    data: { isEnabled },
  });

  return classUpdated;
}

export async function deleteOne(moduleId: string): Promise<void> {
  await prisma.class.delete({
    where: { id: moduleId },
    include: { exercises: true, summary: true, video: true },
  });
}
