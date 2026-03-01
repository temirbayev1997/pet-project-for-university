import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile", authMiddleware, UserController.getProfile);
router.patch("/profile", authMiddleware, UserController.updateProfile);
router.patch("/password", authMiddleware, UserController.changePassword);

export default router;