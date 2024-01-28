import * as classService from "./classService";
import * as videoRepository from "../repositories/videoRepository";

export async function get(classId: string) {
  await classService.validateClassId(classId);

  const video = await videoRepository.getOneByClassId(classId);

  return video;
}
