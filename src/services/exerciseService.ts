import { IExerciseFileContent } from "../types/exerciseTypes";
import * as errorHandling from "../errors/errorHandling";

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
        !test.inputs ||
        !Array.isArray(test.inputs) ||
        test.inputs.length === 0 ||
        !test.result ||
        !Array.isArray(test.result) ||
        test.result.length === 0
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
