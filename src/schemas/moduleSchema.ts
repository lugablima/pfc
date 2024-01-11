import joi from "joi";
import { EditModulePayload, ModulePayload } from "../types/moduleTypes";
import { ClassPayload, EditClassPayload } from "../types/classTypes";
import { classSchema, editClassSchema } from "./classSchema";

const classSchemaWithoutModuleId = classSchema.fork("moduleId", (schema) => schema.optional());
const editClassSchemaWithoutModuleId = editClassSchema.fork("moduleId", (schema) => schema.optional());

export const createModuleSchema = joi.object<ModulePayload>({
  name: joi.string().trim().required(),
  description: joi.string().trim().required(),
  imageUrl: joi.string().uri().required(),
  classes: joi.array<Omit<ClassPayload, "moduleId">>().items(classSchemaWithoutModuleId).required(),
});

export const editModuleSchema = joi.object<EditModulePayload>({
  name: joi.string().trim(),
  description: joi.string().trim(),
  imageUrl: joi.string().uri(),
  classes: joi.array<Omit<EditClassPayload, "moduleId">>().items(editClassSchemaWithoutModuleId),
});
