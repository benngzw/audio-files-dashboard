import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import multer, { FileFilterCallback } from "multer";

dotenv.config();

const FILE_COUNT_LIMIT = parseInt(process.env.FILE_COUNT_LIMIT || "3");
const FILE_SIZE_LIMIT = parseInt(process.env.FILE_SIZE_LIMIT || "100000000");

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.split("/")[0] === "audio") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT, files: FILE_COUNT_LIMIT },
});

export const uploadErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an audio file",
      });
    }
  }
  next(error);
};
