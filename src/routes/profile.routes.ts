import { Router } from "express";
import { UserController } from "../controllers/user/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadAvatar, uploadCover } from "../middlewares/upload.middleware.js";
import { CloudinaryController } from "../controllers/avatar/avatar.controller.js";

const profileRouter = Router();
const userController = new UserController();
const cloudinaryController = new CloudinaryController();

profileRouter.get("/:id", authMiddleware, (req, res) =>
  userController.getUserProfile(req, res),
);
profileRouter.put("/:id", authMiddleware, (req, res) =>
  userController.updateUserProfile(req, res),
);
profileRouter.delete("/:id", authMiddleware, (req, res) =>
  userController.deleteUserProfile(req, res),
);

profileRouter.patch("/:id/avatar", authMiddleware, uploadAvatar, (req, res) =>
  cloudinaryController.updateAvatar(req, res),
);

profileRouter.delete("/:id/avatar", authMiddleware, (req, res) =>
  cloudinaryController.deleteAvatar(req, res),
);

profileRouter.patch("/:id/cover", authMiddleware, uploadCover, (req, res) =>
  cloudinaryController.updateCover(req, res),
);

profileRouter.delete("/:id/cover", authMiddleware, (req, res) =>
  cloudinaryController.deleteCover(req, res),
);

export default profileRouter;
