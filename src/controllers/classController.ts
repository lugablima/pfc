import { Request, Response } from "express";
import { ClassPayload } from "../types/classTypes";
import * as classService from "../services/classService";

export async function create(req: Request, res: Response) {
  await classService.create(req.body as ClassPayload);

  res.status(201).send("Class created successfully!");
}

export async function getAll(req: Request, res: Response) {
  const classes = await classService.getAll(req.params.moduleId);

  res.status(200).send(classes);
}
