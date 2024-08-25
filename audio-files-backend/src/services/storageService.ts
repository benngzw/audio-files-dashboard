import dotenv from "dotenv";
import { Client, ItemBucketMetadata } from "minio";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

/**
 * Creates a storage client for accessing the audio files storage.
 * @returns {Client} The storage client.
 */
export function createStorageClient(): Client {
  console.log("Creating storage client");
  return new Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ROOT_USER || "admin",
    secretKey: process.env.MINIO_ROOT_PASSWORD || "password123",
  });
}

/**
 * Uploads a file to the storage service.
 *
 * @param client - The client object used to interact with the storage service.
 * @param userId - The ID of the user uploading the file.
 * @param file - The file to be uploaded.
 * @returns A Promise that resolves to the object name of the uploaded file.
 */
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

/**
 * Retrieves a file from the storage.
 *
 * @param client - The client used to interact with the storage.
 * @param storagePath - The path of the file in the storage.
 * @returns The retrieved file.
 */
export async function getFile(client: Client, storagePath: string) {
  const file = client.getObject(
    process.env.MINIO_AUDIO_BUCKET || "audio",
    storagePath
  );

  return file;
}
