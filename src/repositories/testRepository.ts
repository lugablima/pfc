import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ICreateTest, IEditTest } from "../types/testTypes";

export async function createMany(
  tests: ICreateTest[],
  exerciseId: string,
  prismaTransaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
) {
  const db = prismaTransaction || prisma;

  const res = await db.test.createMany({
    data: tests.map((t) => ({
      exerciseId,
      inputs: t.inputs,
      result: t.result,
      inputDataType: t.inputDataType,
      resultDataType: t.resultDataType,
    })),
  });

  return res;
}

export async function updateOne(
  test: IEditTest,
  exerciseId: string,
  prismaTransaction?: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
) {
  const db = prismaTransaction || prisma;

  const res = await db.test.update({
    where: { id: test.id },
    data: {
      exerciseId,
      inputs: test.inputs,
      result: test.result,
      inputDataType: test.inputDataType,
      resultDataType: test.resultDataType,
    },
  });

  return res;
}
