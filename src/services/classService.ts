import moment from "moment";

import { ClassPayload } from "../types/classTypes";
import * as moduleRepository from "../repositories/moduleRepository";
import * as classRepository from "../repositories/classRepository";
import * as errorHandling from "../errors/errorHandling";

async function validateModuleId(_class: ClassPayload) {
  const module = await moduleRepository.findOneById(_class.moduleId);

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

async function validateDueDate(_class: ClassPayload) {
  const dueDate = moment.utc(_class.dueDate);
  const now = moment.utc();

  if (dueDate.isSameOrBefore(now)) {
    throw errorHandling.badRequest("The due date provided is in the past.");
  }
}

export async function create(_class: ClassPayload) {
  await validateModuleId(_class);

  await validateClassNameConflictInModule(_class);

  await validateDueDate(_class);

  await classRepository.insertOne(_class);
}
