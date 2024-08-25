import { Request, Response } from "express";

import * as StorageService from "../services/storageService";
import { User } from "../models/userModel";
import { AudioFileModel } from "../models/audioModel";

const storageClient = StorageService.createStorageClient();

export async function uploadAudioFiles(req: Request, res: Response) {
  const { files } = req;
  const user = req.user as User;
  if (!files || !Array.isArray(files) || files.length === 0)
    return res.status(400).send({ error: "No file uploaded" });

  try {
    const uploadedAudioFiles = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const storagePath = await StorageService.uploadFile(
          storageClient,
          user.id,
          file
        );
        const audioMetadata = new AudioFileModel({
          userId: user.id,
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          storagePath,
        });

        return await audioMetadata.save();
      })
    );
    return res.status(201).send(
      uploadedAudioFiles.map((file) => {
        return {
          id: file._id,
          fileName: file.fileName,
          mimeType: file.mimeType,
          size: file.size,
        };
      })
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error uploading file" });
  }
}

export async function getAudioFiles(req: Request, res: Response) {
  const user = req.user as User;
  const audioFiles = await AudioFileModel.find({ userId: user.id })
    .select("_id fileName mimeType size")
    .lean();

  return res.status(200).send(
    audioFiles.map((file) => {
      return {
        id: file._id,
        fileName: file.fileName,
        mimeType: file.mimeType,
        size: file.size,
      };
    })
  );
}

export async function streamAudioFile(req: Request, res: Response) {
  const user = req.user as User;

  try {
    const audioFile = await AudioFileModel.findById(req.params.id);
    if (!audioFile || audioFile.userId.toString() !== user.id.toString())
      return res.status(404).send({ error: "File not found" });

    const file = await StorageService.getFile(
      storageClient,
      audioFile.storagePath
    );

    res.setHeader("Content-Type", audioFile.mimeType);
    file.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error streaming file" });
  }
}

export async function downloadAudioFile(req: Request, res: Response) {
  const user = req.user as User;

  try {
    const audioFile = await AudioFileModel.findById(req.params.id);
    if (!audioFile || audioFile.userId.toString() !== user.id.toString())
      return res.status(404).send({ error: "File not found" });

    const file = await StorageService.getFile(
      storageClient,
      audioFile.storagePath
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${audioFile.fileName}"`
    );
    res.setHeader("Content-Type", audioFile.mimeType);
    file.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error downloading file" });
  }
}

export async function deleteAudioFile(req: Request, res: Response) {
  const user = req.user as User;

  try {
    const audioFile = await AudioFileModel.findById(req.params.id);
    if (!audioFile || audioFile.userId.toString() !== user.id.toString())
      return res.status(404).send({ error: "File not found" });

    await audioFile.deleteOne();
    await StorageService.deleteFile(storageClient, audioFile.storagePath);

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Error deleting file" });
  }
}
