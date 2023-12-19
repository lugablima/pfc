import { Module } from "@prisma/client";
import { ClassPayload } from "./classTypes";

export type TModule = Module;

export type CreateModule = Omit<Module, "id" | "isEnabled" | "createdAt" | "updatedAt">;

export type ModulePayload = CreateModule & {
  classes: Omit<ClassPayload, "moduleId">[];
};
