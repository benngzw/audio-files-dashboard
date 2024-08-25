import { Request, Response } from "express";
import { createStorageClient, uploadFile } from "../services/objectStorage";
import { User } from "../mongoose/schemas/user";
import { AudioFileModel } from "../mongoose/schemas/audio";

const minioClient = createStorageClient();

export async function uploadAudioFiles(req: Request, res: Response) {
  const { files } = req;
  const user = req.user as User;
  if (!files || !Array.isArray(files) || files.length === 0)
    return res.status(400).send({ msg: "No file uploaded" });

  try {
    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const storagePath = await uploadFile(minioClient, user.id, file);
        const audioMetadata = new AudioFileModel({
          userId: user.id,
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          storagePath,
        });

        await audioMetadata.save();
      })
    );
    return res.status(201).send({ msg: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "Error uploading file" });
  }
}

export async function getAudioFiles(req: Request, res: Response) {
  const user = req.user as User;
  const audioFiles = await AudioFileModel.find({ userId: user.id })
    .select("-_id fileName mimeType size")
    .lean();

  return res.status(200).send(audioFiles);
}
