import { Router } from "express";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import validateAdmin from "../middlewares/adminValidatorMiddleware";
import moduleSchema from "../schemas/moduleSchema";
import * as moduleController from "../controllers/moduleController";

const moduleRouter: Router = Router();

moduleRouter.get("/", moduleController.getAll);
moduleRouter.use(validateAdmin);
moduleRouter.post("/", validateSchema(moduleSchema), moduleController.create);
moduleRouter.put("/:moduleId/enable", moduleController.enable);
moduleRouter.put("/:moduleId/disable", moduleController.disable);
moduleRouter.delete("/:moduleId", moduleController.deleteOne);

export default moduleRouter;
