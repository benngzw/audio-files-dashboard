import dotenv from "dotenv";
import { Client, ItemBucketMetadata } from "minio";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const AUDIO_BUCKET = process.env.MINIO_AUDIO_BUCKET || "audio";

/**
 * Creates a storage client for accessing the audio files storage.
 * @returns The storage client.
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
 * @param client The client object used to interact with the storage service.
 * @param userId The ID of the user uploading the file.
 * @param file The file to be uploaded.
 * @returns A Promise that resolves to the storage path of the uploaded file.
 * @throws If there is an error uploading the file.
 */
export async function uploadFile(
  client: Client,
  userId: string,
  file: Express.Multer.File
): Promise<string> {
  const storagePath = `${userId}/${uuidv4()}-${file.originalname}`;
  const metaData: ItemBucketMetadata = {
    mimetype: file.mimetype,
  };

  try {
    await client.putObject(
      AUDIO_BUCKET,
      storagePath,
      file.buffer,
      file.size,
      metaData
    );
    console.log(`File uploaded successfully: ${storagePath}`);
  } catch (err) {
    console.error(`Error uploading file:`, err);
    throw err;
  }

  return storagePath;
}

/**
 * Retrieves a file from the storage.
 *
 * @param client The client used to interact with the storage.
 * @param storagePath The path of the file in the storage.
 * @returns A promise that resolves with the retrieved file.
 * @throws If there is an error retrieving the file.
 */
export async function getFile(client: Client, storagePath: string) {
  try {
    const file = await client.getObject(AUDIO_BUCKET, storagePath);
    console.log(`File ${storagePath} deleted successfully`);
    return file;
  } catch (err) {
    console.error(`Error retrieving file ${storagePath}:`, err);
    throw err;
  }
}

/**
 * Deletes a file from the storage.
 *
 * @param client The client used to interact with the storage.
 * @param storagePath The path of the file to be deleted.
 * @returns A promise that resolves when the file is deleted successfully.
 * @throws If there is an error deleting the file.
 */
export async function deleteFile(
  client: Client,
  storagePath: string
): Promise<void> {
  try {
    await client.removeObject(AUDIO_BUCKET, storagePath);
    console.log(`File ${storagePath} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting file ${storagePath}:`, err);
    throw err;
  }
}
