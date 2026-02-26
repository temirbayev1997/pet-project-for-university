import { Router } from "express";
import {
  getDeals,
  createDeal,
  updateDealStatus, updateDeal
} from "../controllers/dealController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getDeals);
router.post("/", auth, createDeal);
router.patch("/:id/status", auth, updateDealStatus);
router.put("/:id", auth, updateDeal);

export default router;

