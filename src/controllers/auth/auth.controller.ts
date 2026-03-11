import { AuthService } from "../../services/auth/auth.service.js";
import { Request, Response } from "express";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      console.log("Login attempt:", { email, password });
      
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const result = await this.authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      res.status(401).json({
        message: error instanceof Error ? error.message : "Unauthorized",
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        return res
          .status(400)
          .json({ message: "Email, username and password are required" });
      }
      const result = await this.authService.register(email, username, password);
      return res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }

      const result = await this.authService.refreshToken(refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      res.status(401).json({
        message: error instanceof Error ? error.message : "Unauthorized",
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }
      await this.authService.logout(refreshToken);
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Logout failed",
      });
    }
  }
}
