import moment from "moment";

import { ClassPayload, GetAllClasses } from "../types/classTypes";
import * as moduleRepository from "../repositories/moduleRepository";
import * as classRepository from "../repositories/classRepository";
import * as videoService from "./videoService";
import * as summaryService from "./summaryService";
import * as errorHandling from "../errors/errorHandling";

async function validateModuleId(moduleId: string) {
  const module = await moduleRepository.findOneById(moduleId);

  if (!module) {
    throw errorHandling.notFound("There is no module with the given ID.");
  }
}

async function validateClassNameConflictInModule(_class: ClassPayload) {
  const registeredClass = await classRepository.findOneByNameAndModuleId(_class);

  if (registeredClass) {
    throw errorHandling.conflict(`The class '${registeredClass.name}' already exists in this module.`);
  }
}

export async function validateDueDate(_class: ClassPayload) {
  const dueDate = moment.utc(_class.dueDate);
  const now = moment.utc();

  if (dueDate.isSameOrBefore(now)) {
    throw errorHandling.badRequest("The due date provided is in the past.");
  }
}

export async function validateClass(_class: ClassPayload) {
  await validateModuleId(_class.moduleId);

  await validateClassNameConflictInModule(_class);

  await validateDueDate(_class);
}

export async function create(_class: ClassPayload) {
  await validateClass(_class);

  await videoService.validateVideo(_class.videoUrl);

  await summaryService.validateSummary(_class.summaryUrl);

  await classRepository.insertOne(_class);
}

export async function getAll(moduleId: string): Promise<GetAllClasses[] | null> {
  await validateModuleId(moduleId);

  const classes = await classRepository.getAll(moduleId);

  return classes;
}
