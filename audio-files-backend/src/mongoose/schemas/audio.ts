import { model, Schema, Model } from "mongoose";

export interface AudioFile {
  userId: string;
  fileName: string;
  uploadDate: Date;
}

const AudioFileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  storagePath: { type: String, required: true },
});

export const AudioFileModel: Model<AudioFile> = model<
  AudioFile,
  Model<AudioFile>
>("AudioFile", AudioFileSchema);
