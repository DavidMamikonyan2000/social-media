import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service.js";

export class UserController {
  private userService = new UserService();

  async getUserProfile(req: Request, res: Response) {
    try {
      const userId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const user = await this.userService.getUserProfile(userId);
      res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({
        error: error instanceof Error ? error.message : "User not found",
      });
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    try {
      const userId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const user = await this.userService.updateUserProfile(userId, req.body);
      res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({
        error: error instanceof Error ? error.message : "User not found",
      });
    }
  }

  async deleteUserProfile(req: Request, res: Response) {
    try {
      const userId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const response = await this.userService.deleteUserProfile(userId);
      res.status(204).send(response.message);
    } catch (error) {
      return res.status(404).json({
        error: error instanceof Error ? error.message : "User not found",
      });
    }
  }
}
