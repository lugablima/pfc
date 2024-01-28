import { Request, Response } from "express";
import * as videoService from "../services/videoService";

export async function get(req: Request, res: Response) {
  const video = await videoService.get(req.params.classId);

  res.status(200).send(video);
}
