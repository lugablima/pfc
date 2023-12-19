import joi from "joi";
import { ModulePayload } from "../types/moduleTypes";
import { ClassPayload } from "../types/classTypes";
import classSchema from "./classSchema";

const classSchemaWithoutModuleId = classSchema.fork("moduleId", (schema) => schema.optional());

const moduleSchema = joi.object<ModulePayload>({
  name: joi.string().trim().required(),
  description: joi.string().trim().required(),
  imageUrl: joi.string().uri().required(),
  classes: joi.array<Omit<ClassPayload, "moduleId">>().items(classSchemaWithoutModuleId).required(),
});

export default moduleSchema;
