import { Test } from "@prisma/client";

export type TTEST = Test;

export interface ICreateTest {
  inputs: any;
  inputDataType: string;
  result: any;
  resultDataType: string;
}

export type IEditTest = ICreateTest & {
  id: string;
};
