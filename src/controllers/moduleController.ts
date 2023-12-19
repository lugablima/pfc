import { Request, Response } from "express";
import { ModulePayload } from "../types/moduleTypes";
import * as moduleService from "../services/moduleService";

export async function create(req: Request, res: Response) {
  await moduleService.create(req.body as ModulePayload);

  res.status(201).send("Module created successfully!");
}

export async function getAll(req: Request, res: Response) {
  const modules = await moduleService.getAll();

  res.status(200).send(modules);
}
