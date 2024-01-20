import { Exercise } from "@prisma/client";
import { ICreateTest, IEditTest } from "./testTypes";

export type TExercise = Exercise;

export interface ICreateExercise {
  name: string;
  size: number;
  value: string;
  content: string;
}

export interface IExerciseJson {
  name: string;
  statement: string;
  tests: ICreateTest[];
}

export type TEditExerciseJson = IExerciseJson & {
  id: string;
  tests: IEditTest[];
};

export interface IExerciseFileContent {
  exercises: IExerciseJson[];
}

export interface IEditExerciseFileContent {
  exercises: TEditExerciseJson[];
}
