import { Router } from "express";
import { getClients, createClient, archiveClient, updateClient, getClientsWithTelegram } from "../controllers/clientController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getClients);
router.post("/", auth, createClient);
router.patch("/:id/archive", auth, archiveClient);
router.patch("/:id", auth, updateClient);
router.get("/with-telegram", getClientsWithTelegram);
export default router;
