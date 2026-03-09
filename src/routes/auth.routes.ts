import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", (req, res) => authController.register(req, res));
authRouter.post("/login", (req, res) => authController.login(req, res));
authRouter.post("/refresh-token", (req, res) =>
  authController.refreshToken(req, res),
);

export default authRouter;
