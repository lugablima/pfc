import { Module } from "@prisma/client";
import { ClassPayload, EditClassPayload } from "./classTypes";

export type TModule = Module;

export type CreateModule = Omit<Module, "id" | "isEnabled" | "createdAt" | "updatedAt">;

export type ModulePayload = CreateModule & {
  classes: Omit<ClassPayload, "moduleId">[];
};

export type EditModulePayload = Partial<CreateModule> & {
  classes?: Omit<EditClassPayload, "moduleId">[];
};

export type GetAllModules = Omit<Module, "createdAt" | "updatedAt">;
