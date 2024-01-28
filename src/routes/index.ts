import { Router } from "express";
import authRouter from "./authRouter";
import validateToken from "../middlewares/tokenValidatorMiddleware";
import moduleRouter from "./moduleRouter";
import classRouter from "./classRouter";
import exerciseRouter from "./exerciseRouter";
import videoRouter from "./videoRouter";
import summaryRouter from "./summmaryRouter";

const router: Router = Router();

router.use(authRouter);
router.use(validateToken);
router.use("/modules", moduleRouter);
router.use("/classes", classRouter);
router.use("/videos", videoRouter);
router.use("/summaries", summaryRouter);
router.use("/exercises", exerciseRouter);

export default router;
