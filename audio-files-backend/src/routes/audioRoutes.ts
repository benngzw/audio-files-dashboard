import { Router } from "express";

import { audioController } from "../controllers";
import { requireUser, upload, uploadErrorHandler } from "../utils/middlewares";

const router = Router();

router.use(requireUser);

router.post("/", upload.array("file"), audioController.uploadAudioFiles);

router.get("/", audioController.getAudioFiles);

router.get("/:id/stream", audioController.streamAudioFile);

router.get("/:id/download", audioController.downloadAudioFile);

router.use(uploadErrorHandler);

export default router;
