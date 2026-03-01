import { Router } from "express";
import { sendMessageFromCRM, getMessagesByClient } from "../controllers/messageController";

const router = Router();

router.post("/send", sendMessageFromCRM);
router.get("/:clientId", getMessagesByClient);

export default router;