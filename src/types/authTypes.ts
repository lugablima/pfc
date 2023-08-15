import { User } from "@prisma/client";

export type SignUpUser = Omit<User, "id" | "isAdmin" | "createdAt" | "updatedAt">;

export type TUser = User;
