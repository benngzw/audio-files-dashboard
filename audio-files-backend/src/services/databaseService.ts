import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_HOST = process.env.MONGODB_HOST || "localhost";

/**
 * Connects to the MongoDB database.
 * @returns A promise that resolves when the connection is established.
 * @throws An error if there is a problem connecting to the database.
 */
export async function connect(): Promise<void> {
  try {
    await mongoose.connect(`mongodb://${MONGODB_HOST}:27017/local`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}
