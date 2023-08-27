import { prisma } from "../config/prisma";
import { ModulePayload, TModule } from "../types/moduleTypes";

export async function findOneById(id: string): Promise<TModule | null> {
  const module: TModule | null = await prisma.module.findUnique({ where: { id } });

  return module;
}
