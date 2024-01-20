import { Router } from "express";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import validateAdmin from "../middlewares/adminValidatorMiddleware";
import { createModuleSchema, editModuleSchema } from "../schemas/moduleSchema";
import * as moduleController from "../controllers/moduleController";

const moduleRouter: Router = Router();

moduleRouter.get("/", moduleController.getAll);
moduleRouter.get("/:moduleId", moduleController.getModuleInfoForEdit);
moduleRouter.use(validateAdmin);
moduleRouter.post("/", validateSchema(createModuleSchema), moduleController.create);
moduleRouter.put("/:moduleId", validateSchema(editModuleSchema), moduleController.edit);
moduleRouter.put("/:moduleId/enable", moduleController.enable);
moduleRouter.put("/:moduleId/disable", moduleController.disable);
moduleRouter.delete("/:moduleId", moduleController.deleteOne);

export default moduleRouter;
