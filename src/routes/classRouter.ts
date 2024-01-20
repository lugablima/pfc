import { Router } from "express";

import validateSchema from "../middlewares/schemaValidatorMiddleware";
import validateAdmin from "../middlewares/adminValidatorMiddleware";
import { classSchema, editClassSchemaWithoutId } from "../schemas/classSchema";
import * as classController from "../controllers/classController";

const classRouter: Router = Router();

classRouter.get("/:moduleId", classController.getAll);
classRouter.get("/:classId/edit", classController.getClassInfoForEdit);
classRouter.use(validateAdmin);
classRouter.post("/", validateSchema(classSchema), classController.create);
classRouter.put("/:classId", validateSchema(editClassSchemaWithoutId), classController.edit);
classRouter.put("/:classId/enable", classController.enable);
classRouter.put("/:classId/disable", classController.disable);
classRouter.delete("/:classId", classController.deleteOne);

export default classRouter;
