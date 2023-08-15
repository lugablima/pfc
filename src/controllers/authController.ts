import { Request, Response } from "express";
import { SignUpUser } from "../types/authTypes";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  await authService.signUp(req.body as SignUpUser);

  res.status(201).send("User registered successfully!");
}
