import { Router } from "express";
import authRouter from "./auth.routes.js";
import profileRouter from "./profile.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);

export default router;
