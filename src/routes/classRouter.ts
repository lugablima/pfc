import { Router } from "express";

import validateSchema from "../middlewares/schemaValidatorMiddleware";
import validateAdmin from "../middlewares/adminValidatorMiddleware";
import classSchema from "../schemas/classSchema";
import * as classController from "../controllers/classController";

const classRouter: Router = Router();

classRouter.get("/:moduleId", classController.getAll);
classRouter.use(validateAdmin);
classRouter.post("/", validateSchema(classSchema), classController.create);

export default classRouter;
