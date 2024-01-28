import { Router } from "express";

import * as videoController from "../controllers/videoController";

const videoRouter: Router = Router();

videoRouter.get("/:classId", videoController.get);

export default videoRouter;
