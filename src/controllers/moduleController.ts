import { Request, Response } from "express";
import { ModulePayload } from "../types/moduleTypes";
import * as moduleService from "../services/moduleService";

export async function create(req: Request, res: Response) {
  await moduleService.create(req.body as ModulePayload);

  res.status(201).send("Module created successfully!");
}
