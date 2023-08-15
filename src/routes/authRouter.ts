import { Router } from "express";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import { signUpSchema } from "../schemas/authSchema";
import * as authController from "../controllers/authController";

const authRouter: Router = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), authController.signUp);

export default authRouter;
