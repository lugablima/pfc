import { Router } from "express";

import * as summaryController from "../controllers/summaryController";

const summaryRouter: Router = Router();

summaryRouter.get("/:classId", summaryController.get);

export default summaryRouter;
