import { Class } from "@prisma/client";

export type TClass = Class;

export type ClassPayload = Omit<Class, "id" | "isEnabled" | "createdAt" | "updatedAt">;
