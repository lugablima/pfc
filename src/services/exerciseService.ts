import { IExerciseFileContent } from "../types/exerciseTypes";
import * as errorHandling from "../errors/errorHandling";
import * as exerciseRepository from "../repositories/exerciseRepository";
import * as resolutionRepository from "../repositories/resolutionRepository";
import { TCreateResolutionPayload } from "../types/resolutionTypes";

/* eslint-disable no-restricted-syntax */
export function validateJSONStructure(jsonData: any): jsonData is IExerciseFileContent {
  if (!jsonData || !jsonData.exercises || !Array.isArray(jsonData.exercises)) {
    return false;
  }

  for (const exercise of jsonData.exercises) {
    if (
      !exercise ||
      typeof exercise.name !== "string" ||
      typeof exercise.statement !== "string" ||
      !exercise.tests ||
      !Array.isArray(exercise.tests) ||
      exercise.tests.length === 0
    ) {
      return false;
    }

    for (const test of exercise.tests) {
      if (
        !test ||
        test.inputs === undefined ||
        test.result === undefined ||
        !test.inputDataType ||
        !test.resultDataType
      ) {
        return false;
      }
    }
  }

  return true;
}

export function validateExerciseContent(content: string) {
  const result = validateJSONStructure(JSON.parse(content));

  if (!result) {
    throw errorHandling.badRequest("Invalid exercise file content.");
  }
}

export async function validateExerciseId(exerciseId: string) {
  const exercise = await exerciseRepository.getOneById(exerciseId);

  if (!exercise) {
    throw errorHandling.notFound("Exercise id not found");
  }
}

export async function createResolution(userId: string, exerciseId: string, body: TCreateResolutionPayload) {
  await validateExerciseId(exerciseId);

  await resolutionRepository.createOrUpdateOne(userId, exerciseId, body);
}
