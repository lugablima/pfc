import { Class } from "@prisma/client";
import { ICreateExercise } from "./exerciseTypes";

export type TClass = Class;

export type ClassPayload = Omit<Class, "id" | "isEnabled" | "createdAt" | "updatedAt"> & {
  videoUrl: string;
  summaryUrl: string;
  exerciseFile: ICreateExercise;
};

export type EditClassPayload = Omit<Class, "isEnabled" | "createdAt" | "updatedAt"> & {
  videoUrl: string;
  summaryUrl: string;
  exerciseFile: ICreateExercise;
};

export type ClassWithoutModuleId = Omit<ClassPayload, "moduleId">;

export type GetAllClasses = Omit<Class, "createdAt" | "updatedAt">;
