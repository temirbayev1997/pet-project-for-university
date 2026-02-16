import { Router } from "express";
import {
  getDeals,
  createDeal,
  updateDealStatus, updateDeal
} from "../controllers/dealController";

const router = Router();

router.get("/", getDeals);
router.post("/", createDeal);
router.patch("/:id/status", updateDealStatus);
router.put("/:id", updateDeal);

export default router;

