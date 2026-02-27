import { Router } from "express";
import {
  getDeals,
  createDeal,
  updateDeal,
  updateDealStatus
} from "../controllers/dealController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getDeals);
router.post("/", authMiddleware, createDeal);
router.put("/:id", authMiddleware, updateDeal);
router.patch("/:id/status", authMiddleware, updateDealStatus);

export default router;