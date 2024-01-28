import { Request, Response } from "express";
import * as exerciseService from "../services/exerciseService";

export async function createResolution(req: Request, res: Response) {
  await exerciseService.createResolution(res.locals.userId, req.params.exerciseId, req.body);

  res.status(200).send("Resolution created successfully.");
}
