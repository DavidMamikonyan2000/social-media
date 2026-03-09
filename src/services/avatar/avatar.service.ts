import fs from "fs";
import cloudinary from "../../config/cloudinary.js";
import { AppDataSource } from "../../config/database.js";

export class CloudinaryService {
  private userRepository = AppDataSource.getRepository("User");

  private extractPublicId(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
    return match ? match[1] : null;
  }

  async updateAvatar(userId: string, tempFilePath: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");
    if (user.avatarUrl) {
      const publicId = this.extractPublicId(user.avatarUrl);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "social-media/avatars",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });
    fs.unlinkSync(tempFilePath);
    user.avatarUrl = result.secure_url;
    await this.userRepository.save(user);
    return user;
  }

  async deleteAvatar(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");
    if (user.avatarUrl) {
      const publicId = this.extractPublicId(user.avatarUrl);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    user.avatarUrl = null;
    await this.userRepository.save(user);
    return user;
  }

  async updateCover(userId: string, tempFilePath: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");
    if (user.coverUrl) {
      const publicId = this.extractPublicId(user.coverUrl);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "social-media/covers",
      transformation: [{ width: 1200, height: 400, crop: "fill" }],
    });
    fs.unlinkSync(tempFilePath);
    user.coverUrl = result.secure_url;
    await this.userRepository.save(user);
    return user;
  }

  async deleteCover(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");
    if (user.coverUrl) {
      const publicId = this.extractPublicId(user.coverUrl);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    user.coverUrl = null;
    await this.userRepository.save(user);
    return user;
  }
}
