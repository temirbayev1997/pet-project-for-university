import { Router } from "express";
import { ReminderController } from "../controllers/reminderController";

const router = Router();

router.get("/", ReminderController.getAll);
router.post("/", ReminderController.create);
router.patch("/:id", ReminderController.updateStatus);
router.delete("/:id", ReminderController.delete);

export default router;