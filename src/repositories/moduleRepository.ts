import { prisma } from "../config/prisma";
import { CreateModule, TModule } from "../types/moduleTypes";

export async function findOneById(id: string): Promise<TModule | null> {
  const module: TModule | null = await prisma.module.findUnique({ where: { id } });

  return module;
}

export async function findOneByName(name: string): Promise<TModule | null> {
  const module: TModule | null = await prisma.module.findUnique({ where: { name } });

  return module;
}

export async function insertOne(module: CreateModule): Promise<TModule> {
  const createdModule = await prisma.module.create({ data: { ...module } });

  return createdModule;
}
