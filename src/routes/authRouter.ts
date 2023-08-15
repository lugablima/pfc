import { Router } from "express";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchema";
import * as authController from "../controllers/authController";

const authRouter: Router = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), authController.signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), authController.signIn);

export default authRouter;
