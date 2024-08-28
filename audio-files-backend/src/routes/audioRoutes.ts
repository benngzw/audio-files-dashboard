import { Router } from "express";

import * as AudioController from "../controllers/audioController";
import { requireUser, upload, uploadErrorHandler } from "../middlewares";

const router = Router();

router.use(requireUser);

/**
 * @swagger
 * tags:
 *   - name: Audio
 *     description: Operations related to audio files
 */

/**
 * @swagger
 * /audio:
 *   post:
 *     summary: Upload audio file(s)
 *     tags: [Audio]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *                 example: speech
 *               description:
 *                 type: string
 *                 example: National Day Speech
 *     responses:
 *       201:
 *         description: Audio file created successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: 66cb626ecabc14ef04662cef
 *                    fileName:
 *                      type: string
 *                      example: OggAudioFile.ogg
 *                    mimeType:
 *                      type: string
 *                      example: audio/ogg
 *                    size:
 *                      type: integer
 *                      example: 1032948
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.post("/", upload.array("file"), AudioController.uploadAudioFiles);

/**
 * @swagger
 * /audio:
 *   get:
 *     summary: Retrieve a list of all audio files
 *     tags: [Audio]
 *     responses:
 *       200:
 *         description: A list of audio files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "66cb634fbb4a383ca3a52424"
 *                   fileName:
 *                     type: string
 *                     example: "SampleAudioFile1.wav"
 *                   mimeType:
 *                     type: string
 *                     example: "audio/wave"
 *                   size:
 *                     type: integer
 *                     example: 1323044
 *             example:
 *               - id: "66cb634fbb4a383ca3a52424"
 *                 fileName: "SampleAudioFile1.wav"
 *                 mimeType: "audio/wave"
 *                 size: 1323044
 *               - id: "66cb634fbb4a383ca3a52426"
 *                 fileName: "SampleAudioFile2.ogg"
 *                 mimeType: "audio/ogg"
 *                 size: 1032948
 *               - id: "66cb634fbb4a383ca3a52428"
 *                 fileName: "SampleAudioFile3.mp3"
 *                 mimeType: "audio/mpeg"
 *                 size: 1059386
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get("/", AudioController.getAudioFiles);

/**
 * @swagger
 * /audio/{id}/stream:
 *   get:
 *     summary: Stream a specific audio file by ID
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the audio file
 *     responses:
 *       200:
 *         description: Audio file streamed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: File not found
 */
router.get("/:id/stream", AudioController.streamAudioFile);

/**
 * @swagger
 * /audio/{id}/download:
 *   get:
 *     summary: Download a specific audio file by ID
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the audio file
 *     responses:
 *       200:
 *         description: Audio file downloaded successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: File not found
 */
router.get("/:id/download", AudioController.downloadAudioFile);

/**
 * @swagger
 * /audio/{id}:
 *   delete:
 *     summary: Delete a specific audio file by ID
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the audio file
 *     responses:
 *       200:
 *         description: Audio file deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: File not found
 */
router.delete("/:id", AudioController.deleteAudioFile);

router.use(uploadErrorHandler);

export default router;
