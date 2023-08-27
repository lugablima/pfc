import { prisma } from "../config/prisma";
import { ClassPayload, TClass } from "../types/classTypes";

export async function findOneByNameAndModuleId(_class: ClassPayload): Promise<TClass | null> {
  const registeredClass: TClass | null = await prisma.class.findUnique({
    where: { name_moduleId: { name: _class.name, moduleId: _class.moduleId } },
  });

  return registeredClass;
}

export async function insertOne(_class: ClassPayload): Promise<void> {
  await prisma.class.create({ data: { ..._class } });
}
