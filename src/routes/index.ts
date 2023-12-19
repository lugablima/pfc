import { Router } from "express";
import authRouter from "./authRouter";
import validateToken from "../middlewares/tokenValidatorMiddleware";
import moduleRouter from "./moduleRouter";
import classRouter from "./classRouter";

const router: Router = Router();

router.use(authRouter);
router.use(validateToken);
router.use("/modules", moduleRouter);
router.use("/classes", classRouter);

export default router;
