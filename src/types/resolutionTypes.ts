import { Resolution } from "@prisma/client";

export type TCreateResolutionPayload = Omit<Resolution, "id" | "createdAt" | "updatedAt" | "exerciseId" | "userId">;
