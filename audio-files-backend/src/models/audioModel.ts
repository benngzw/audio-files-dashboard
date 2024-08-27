import { model, Schema, Model } from "mongoose";

export interface AudioFile {
  userId: string;
  fileName: string;
  uploadDate: Date;
  mimeType: string;
  size: number;
  storagePath: string;
  description?: string;
  category?: string;
}

const AudioFileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  storagePath: { type: String, required: true },
  description: { type: String },
  category: { type: String },
});

export const AudioFileModel: Model<AudioFile> = model<
  AudioFile,
  Model<AudioFile>
>("AudioFile", AudioFileSchema);
