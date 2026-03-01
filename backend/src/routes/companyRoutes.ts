import { upload } from "../middleware/upload";
import { authMiddleware } from "../middleware/authMiddleware";
import { CompanyController } from "../controllers/companyController";
import { Router } from "express";

const router = Router();

router.get("/profile", authMiddleware, CompanyController.getProfile);
router.patch("/", authMiddleware, CompanyController.updateCompany);
router.post(
  "/logo",
  authMiddleware,
  upload.single("logo"),
  CompanyController.uploadLogo
);
export default router;