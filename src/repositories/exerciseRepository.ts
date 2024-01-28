import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";
import { IExerciseJson, TEditExerciseJson } from "../types/exerciseTypes";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function createOne(
  exercise: IExerciseJson,
  exerciseSeq: number,
  classId: string,
  prismaTransaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
) {
  const db = prismaTransaction || prisma;

  const res = await db.exercise.create({
    data: {
      name: exercise.name,
      sequence: exerciseSeq,
      statement: exercise.statement,
      classId,
    },
  });

  return res;
}

export async function updateOne(
  exercise: TEditExerciseJson,
  classId: string,
  prismaTransaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
) {
  const db = prismaTransaction || prisma;

  const res = await db.exercise.update({
    where: { id: exercise.id },
    data: {
      name: exercise.name,
      statement: exercise.statement,
      classId,
    },
  });

  return res;
}

export async function getAllByClassIdAndUserId(classId: string, userId: string) {
  const exercises = await prisma.exercise.findMany({
    where: { classId },
    orderBy: { sequence: "asc" },
    select: {
      id: true,
      name: true,
      sequence: true,
      statement: true,
      class: { select: { id: true, dueDate: true } },
      tests: {
        select: { id: true, inputs: true, result: true, inputDataType: true, resultDataType: true },
        orderBy: { createdAt: "asc" },
      },
      resolutions: { select: { id: true, userId: true, resolution: true, grade: true }, where: { userId } },
    },
  });

  return exercises;
}

export async function getOneById(exerciseId: string) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
  });

  return exercise;
}
