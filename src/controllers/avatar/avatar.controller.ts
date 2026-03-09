import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { CloudinaryService } from "../../services/avatar/avatar.service.js";

export class CloudinaryController {
  private cloudinaryService = new CloudinaryService();

  async updateAvatar(req: Request, res: Response) {
    try {
      const file = req.files!.avatar as UploadedFile;

      const user = await this.cloudinaryService.updateAvatar(
        req.params.id.toString(),
        file.tempFilePath,
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update avatar" });
    }
  }

  async deleteAvatar(req: Request, res: Response) {
    try {
      const response = await this.cloudinaryService.deleteAvatar(
        req.params.id.toString(),
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete avatar" });
    }
  }

  async updateCover(req: Request, res: Response) {
    try {
      const file = req.files!.cover as UploadedFile;
      const user = await this.cloudinaryService.updateCover(
        req.params.id.toString(),
        file.tempFilePath,
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cover" });
    }
  }

  async deleteCover(req: Request, res: Response) {
    try {
      const response = await this.cloudinaryService.deleteCover(req.params.id.toString());
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete cover" });
    }
  }
}
