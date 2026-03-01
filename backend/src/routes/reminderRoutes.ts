import { Router } from "express";
import { ReminderController } from "../controllers/reminderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, ReminderController.getAll);
router.post("/", authMiddleware, ReminderController.create);
router.patch("/:id", authMiddleware, ReminderController.updateStatus);
router.delete("/:id", authMiddleware, ReminderController.delete);
router.put("/:id", authMiddleware, ReminderController.update);

export default router;