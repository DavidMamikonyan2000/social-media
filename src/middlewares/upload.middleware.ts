import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import {
  validateAvatarFile,
  validateCoverFile,
} from "../config/fileValidation.js";

export function uploadAvatar(req: Request, res: Response, next: NextFunction) {
  const file = req.files?.avatar as UploadedFile | undefined;
  if (!file) return res.status(400).json({ message: "No file uploaded" });
  try {
    validateAvatarFile(file);
    next();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export function uploadCover(req: Request, res: Response, next: NextFunction) {
  const file = req.files?.cover as UploadedFile | undefined;
  if (!file) return res.status(400).json({ message: "No file uploaded" });
  try {
    validateCoverFile(file);
    next();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
