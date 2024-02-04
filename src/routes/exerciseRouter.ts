import { Router } from "express";

import * as exerciseController from "../controllers/exerciseController";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import { createResolutionSchema } from "../schemas/exerciseSchema";
import validateAdmin from "../middlewares/adminValidatorMiddleware";

const exerciseRouter: Router = Router();

exerciseRouter.post(
  "/:exerciseId/resolution",
  validateSchema(createResolutionSchema),
  exerciseController.createResolution,
);
exerciseRouter.use(validateAdmin);
exerciseRouter.get("/dashboard", exerciseController.getAllForDashboard);

export default exerciseRouter;
