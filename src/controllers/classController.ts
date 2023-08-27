import { Request, Response } from "express";
import { ClassPayload } from "../types/classTypes";
import * as classService from "../services/classService";

export async function create(req: Request, res: Response) {
  await classService.create(req.body as ClassPayload);

  res.status(201).send("Class created successfully!");
}
