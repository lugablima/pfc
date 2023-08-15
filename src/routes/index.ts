import { Router } from "express";
import authRouter from "./authRouter";
import validateToken from "../middlewares/tokenValidatorMiddleware";

const router: Router = Router();

router.use(authRouter);
router.use(validateToken);

export default router;
