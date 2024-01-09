import { prisma } from "../config/prisma";
import { CreateModule, GetAllModules, TModule } from "../types/moduleTypes";

export async function findOneById(id: string): Promise<TModule | null> {
  const module: TModule | null = await prisma.module.findUnique({ where: { id } });

  return module;
}

export async function findOneByName(name: string): Promise<TModule | null> {
  const module: TModule | null = await prisma.module.findUnique({ where: { name } });

  return module;
}

export async function getAll(): Promise<GetAllModules[] | null> {
  const modules: GetAllModules[] | null = await prisma.module.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, description: true, imageUrl: true, isEnabled: true, createdAt: true },
  });

  return modules;
}

export async function insertOne(module: CreateModule): Promise<TModule> {
  const createdModule = await prisma.module.create({ data: { ...module } });

  return createdModule;
}

export async function updateOneIsEnabled(moduleId: string, isEnabled: boolean): Promise<TModule> {
  const moduleUpdated = await prisma.module.update({
    where: { id: moduleId },
    data: { isEnabled },
  });

  return moduleUpdated;
}

export async function findOneByIdAndIsEnabled(moduleId: string, isEnabled: boolean): Promise<TModule | null> {
  const module = await prisma.module.findUnique({
    where: { id: moduleId, AND: { isEnabled } },
  });

  return module;
}
