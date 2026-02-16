import { Router } from "express";
import { getClients, createClient, archiveClient } from "../controllers/clientController";

const router = Router();

router.get("/", getClients);
router.post("/", createClient);
router.patch("/:id/archive", archiveClient);

export default router;
