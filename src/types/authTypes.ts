import { User } from "@prisma/client";

export type TUser = User;

export type SignUpUser = Omit<User, "id" | "isAdmin" | "createdAt" | "updatedAt">;

export type SignInUser = Omit<SignUpUser, "name">;

export interface UserToken {
  token: string;
}
