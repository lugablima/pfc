import { Router } from "express";

import * as exerciseController from "../controllers/exerciseController";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import { createResolutionSchema } from "../schemas/exerciseSchema";

const exerciseRouter: Router = Router();

exerciseRouter.post(
  "/:exerciseId/resolution",
  validateSchema(createResolutionSchema),
  exerciseController.createResolution,
);

export default exerciseRouter;
