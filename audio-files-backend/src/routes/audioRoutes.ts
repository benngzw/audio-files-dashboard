import { Router } from "express";

import * as AudioController from "../controllers/audioController";
import { requireUser, upload, uploadErrorHandler } from "../middlewares";

const router = Router();

router.use(requireUser);

router.post("/", upload.array("file"), AudioController.uploadAudioFiles);

router.get("/", AudioController.getAudioFiles);

router.get("/:id/stream", AudioController.streamAudioFile);

router.get("/:id/download", AudioController.downloadAudioFile);

router.use(uploadErrorHandler);

export default router;
