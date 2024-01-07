import { Request, Response } from "express";
import { SignInUser, SignUpUser } from "../types/authTypes";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  await authService.signUp(req.body as SignUpUser);

  res.status(201).send("User registered successfully!");
}

export async function signIn(req: Request, res: Response) {
  const response = await authService.signIn(req.body as SignInUser);

  res.status(200).send(response);
}
