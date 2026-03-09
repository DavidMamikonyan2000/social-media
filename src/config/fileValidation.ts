import { UploadedFile } from "express-fileupload";

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp"];
const MB = 1024 * 1024;

export function validateAvatarFile(file: UploadedFile): void {
  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    throw new Error("Only JPG, PNG and WEBP files are allowed");
  }
  if (file.size > 5 * MB) {
    throw new Error("Avatar must be under 5 MB");
  }
}

export function validateCoverFile(file: UploadedFile): void {
  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    throw new Error("Only JPG, PNG and WEBP files are allowed");
  }
  if (file.size > 10 * MB) {
    throw new Error("Cover must be under 10 MB");
  }
}
