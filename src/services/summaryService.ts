import * as summaryRepository from "../repositories/summaryRepository";
import * as errorHandling from "../errors/errorHandling";
import { ModulePayload } from "../types/moduleTypes";

export async function validateSummary(summaryUrl: string) {
  const registeredSummary = await summaryRepository.findOneByUrl(summaryUrl);

  if (registeredSummary) {
    throw errorHandling.conflict("This summary url already exists.");
  }
}

export async function validateSummaryUrlConflict(module: ModulePayload) {
  const summariesObj: { [key: string]: boolean } = {};

  // eslint-disable-next-line no-return-assign
  module.classes.forEach((_class) => (summariesObj[_class.summaryUrl.toLowerCase()] = true));

  if (Object.keys(summariesObj).length !== module.classes.length) {
    throw errorHandling.badRequest("There are repeated summary urls in the request.");
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const summaryUrl of Object.keys(summariesObj)) {
    // eslint-disable-next-line no-await-in-loop
    await validateSummary(summaryUrl);
  }
}
