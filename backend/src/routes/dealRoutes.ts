import { Router } from "express";
import {
  getDeals,
  createDeal,
  updateDealStatus,
} from "../controllers/dealController";

const router = Router();

router.get("/", getDeals);
router.post("/", createDeal);
router.patch("/:id/status", updateDealStatus);

export default router;

