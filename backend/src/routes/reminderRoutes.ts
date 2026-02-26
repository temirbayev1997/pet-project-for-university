import { Router } from "express";
import { ReminderController } from "../controllers/reminderController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, ReminderController.getAll);
router.post("/", auth, ReminderController.create);
router.patch("/:id", auth, ReminderController.updateStatus);
router.delete("/:id", auth, ReminderController.delete);
router.put("/:id", auth, ReminderController.update);

export default router;