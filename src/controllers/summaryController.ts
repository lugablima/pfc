import { Request, Response } from "express";
import * as summaryService from "../services/summaryService";

export async function get(req: Request, res: Response) {
  const summary = await summaryService.get(req.params.classId);

  res.status(200).send(summary);
}
