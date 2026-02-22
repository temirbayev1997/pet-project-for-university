import { Router } from "express";
import { getClients, createClient, archiveClient, updateClient } from "../controllers/clientController";

const router = Router();

router.get("/", getClients);
router.post("/", createClient);
router.patch("/:id/archive", archiveClient);
router.patch("/:id", updateClient);

export default router;
