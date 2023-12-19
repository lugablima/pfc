import { Class } from "@prisma/client";

export type TClass = Class;

export type ClassPayload = Omit<Class, "id" | "isEnabled" | "createdAt" | "updatedAt"> & {
  videoUrl: string;
  summaryUrl: string;
};

export type ClassWithoutModuleId = Omit<ClassPayload, "moduleId">;
