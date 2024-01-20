import { Test } from "@prisma/client";

export type TTEST = Test;

export interface ICreateTest {
  inputs: string[];
  result: string[];
}

export type IEditTest = ICreateTest & {
  id: string;
};
