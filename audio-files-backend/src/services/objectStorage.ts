import dotenv from "dotenv";
import { Client, ItemBucketMetadata } from "minio";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export function createStorageClient(): Client {
  return new Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ROOT_USER || "admin",
    secretKey: process.env.MINIO_ROOT_PASSWORD || "password123",
  });
}

export async function uploadFile(
  client: Client,
  userId: string,
  file: Express.Multer.File
): Promise<string> {
  const objectName = `${userId}/${uuidv4()}-${file.originalname}`;
  const metaData: ItemBucketMetadata = {
    mimetype: file.mimetype,
  };

  await client.putObject(
    process.env.MINIO_AUDIO_BUCKET || "audio",
    objectName,
    file.buffer,
    file.size,
    metaData
  );

  return objectName;
}
