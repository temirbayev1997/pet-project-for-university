import { Router } from "express";
import { getClients, createClient, archiveClient, updateClient } from "../controllers/clientController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getClients);
router.post("/", auth, createClient);
router.patch("/:id/archive", auth, archiveClient);
router.patch("/:id", auth, updateClient);

export default router;
