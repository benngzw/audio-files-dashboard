import { Router } from "express";

import * as audioController from "../controllers/audioController";
import { requireUser, upload, uploadErrorHandler } from "../utils/middlewares";

const router = Router();

router.use(requireUser);

router.post("/", upload.array("file"), audioController.uploadAudioFiles);

router.get("/", audioController.getAudioFiles);

router.use(uploadErrorHandler);

export default router;
