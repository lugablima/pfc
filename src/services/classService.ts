/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import moment from "moment";

import { ClassPayload, GetAllClasses, TClass } from "../types/classTypes";
import * as exerciseService from "./exerciseService";
import * as moduleRepository from "../repositories/moduleRepository";
import * as classRepository from "../repositories/classRepository";
import * as exerciseRepository from "../repositories/exerciseRepository";
import * as testRepository from "../repositories/testRepository";
import * as errorHandling from "../errors/errorHandling";
import { IEditExerciseFileContent, IExerciseFileContent } from "../types/exerciseTypes";
import { prisma } from "../config/prisma";

export async function validateModuleId(moduleId: string) {
  const module = await moduleRepository.findOneById(moduleId);

  if (!module) {
    throw errorHandling.notFound("There is no module with the given ID.");
  }
}

export async function validateClassNameConflictInModule(_class: ClassPayload, distintictId?: string) {
  if (!_class.name) return;

  let registeredClass: TClass | null;

  if (distintictId) {
    registeredClass = await classRepository.findOneByNameAndModuleId(_class, distintictId);
  } else {
    registeredClass = await classRepository.findOneByNameAndModuleId(_class);
  }

  if (registeredClass) {
    throw errorHandling.conflict(`The class '${registeredClass.name}' already exists in this module.`);
  }
}

export async function validateDueDate(_class: ClassPayload) {
  if (!_class.dueDate) return;

  const dueDate = moment.utc(_class.dueDate);
  const now = moment.utc();

  if (dueDate.isSameOrBefore(now)) {
    throw errorHandling.badRequest("The due date provided is in the past.");
  }
}

export async function validateClass(_class: ClassPayload, distintictId?: string) {
  await validateModuleId(_class.moduleId);

  await validateClassNameConflictInModule(_class, distintictId);

  await validateDueDate(_class);
}

export async function validateClassId(classId: string) {
  const classFounded = await classRepository.findOneById(classId);

  if (!classFounded) {
    throw errorHandling.notFound("There is no class with the given ID.");
  }
}

async function validateIfClassIsEnabledOrDisabled(classId: string, isEnabledTarget: boolean) {
  const classFounded = await classRepository.findOneByIdAndIsEnabled(classId, isEnabledTarget);
  const enabledOrDisabled = isEnabledTarget ? "enabled" : "disabled";

  if (classFounded) {
    throw errorHandling.conflict(`Class is already ${enabledOrDisabled}`);
  }
}

export async function create(_class: ClassPayload) {
  await validateClass(_class);

  exerciseService.validateExerciseContent(_class.exerciseFile.content);

  await prisma.$transaction(async (tx) => {
    const { id: classId } = await classRepository.insertOne(
      {
        ..._class,
        dueDate: moment.parseZone(_class.dueDate).toDate(),
      },
      tx,
    );

    const contentParsed: IExerciseFileContent = JSON.parse(_class.exerciseFile.content);

    for (const [idx, exercise] of Object.entries(contentParsed.exercises)) {
      const { id: exerciseId } = await exerciseRepository.createOne(exercise, Number(idx) + 1, classId, tx);

      await testRepository.createMany(exercise.tests, exerciseId, tx);
    }
  });
}

export async function edit(_class: ClassPayload, classId: string) {
  await validateClassId(classId);

  await validateClass(_class, classId);

  exerciseService.validateExerciseContent(_class.exerciseFile.content);

  await prisma.$transaction(async (tx) => {
    await exerciseRepository.deleteManyByClassId(classId);

    await testRepository.deleteManyByClassId(classId);

    const contentParsed: IEditExerciseFileContent = JSON.parse(_class.exerciseFile.content);

    for (const exercise of contentParsed.exercises) {
      const { id: exerciseId } = await exerciseRepository.updateOne(exercise, classId, tx);

      for (const test of exercise.tests) {
        await testRepository.updateOne(test, exerciseId, tx);
      }
    }
  });
}

export async function getAll(moduleId: string): Promise<GetAllClasses[] | null> {
  await validateModuleId(moduleId);

  const classes = await classRepository.getAll(moduleId);

  return classes;
}

export async function getClassInfoForEdit(classId: string) {
  await validateClassId(classId);

  const _class = await classRepository.getClassInfoForEdit(classId);

  return _class;
}

export async function getAllExercises(classId: string, userId: string) {
  await validateClassId(classId);

  const exercises = await exerciseRepository.getAllByClassIdAndUserId(classId, userId);

  return exercises;
}

export async function enableOrDisable(classId: string, isEnabledTarget: boolean): Promise<void> {
  await validateClassId(classId);

  await validateIfClassIsEnabledOrDisabled(classId, isEnabledTarget);

  await classRepository.updateOneIsEnabled(classId, isEnabledTarget);
}

export async function deleteOne(classId: string): Promise<void> {
  await validateClassId(classId);

  await classRepository.deleteOne(classId);
}
