import joi from "joi";
import { ClassPayload, EditClassPayload } from "../types/classTypes";

export const classSchema = joi.object<ClassPayload>({
  name: joi.string().trim().required(),
  imageUrl: joi.string().uri().required(),
  videoUrl: joi.string().uri().required(),
  summaryUrl: joi.string().uri().required(),
  moduleId: joi.string().trim().required(),
  dueDate: joi.date().iso().required(),
});

export const editClassSchema = joi.object<EditClassPayload>({
  id: joi.string().trim(),
  name: joi.string().trim(),
  imageUrl: joi.string().uri(),
  videoUrl: joi.string().uri(),
  summaryUrl: joi.string().uri(),
  moduleId: joi.string().trim(),
  dueDate: joi.date().iso(),
});

export const editClassSchemaWithoutId = joi.object<ClassPayload>({
  name: joi.string().trim(),
  imageUrl: joi.string().uri(),
  videoUrl: joi.string().uri(),
  summaryUrl: joi.string().uri(),
  moduleId: joi.string().trim().required(),
  dueDate: joi.date().iso(),
});
