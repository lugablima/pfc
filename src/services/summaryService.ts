import * as classService from "./classService";
import * as summaryRepository from "../repositories/summaryRepository";

export async function get(classId: string) {
  await classService.validateClassId(classId);

  const res = await summaryRepository.getOneByClassId(classId);

  return res;
}
