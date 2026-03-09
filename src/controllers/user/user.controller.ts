import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service.js";

export class UserController {
  private userService = new UserService();

  async getUserProfile(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserProfile(+req.params.id);
      res.status(200).json(user);
    } catch (error) {
      return res
        .status(404)
        .json({
          error: error instanceof Error ? error.message : "User not found",
        });
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    try {
      const user = await this.userService.updateUserProfile(
        +req.params.id,
        req.body,
      );
      res.status(200).json(user);
    } catch (error) {
      return res
        .status(404)
        .json({
          error: error instanceof Error ? error.message : "User not found",
        });
    }
  }

  async deleteUserProfile(req: Request, res: Response) {
    try {
      const response = await this.userService.deleteUserProfile(+req.params.id);
      res.status(204).send(response.message);
    } catch (error) {
      return res
        .status(404)
        .json({
          error: error instanceof Error ? error.message : "User not found",
        });
    }
  }
}
