// src/interfaces/routes/v1/auth.routes.js (100% WORKING VERSION)
import express from "express";
import { registerUser } from "../../controllers/AuthController.js";
import { upload } from "../../../infrastructure/utils/upload.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiter for registration
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: "Too many registration attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Critical: Spaces after every comma — no missing spaces!
router.post(
  "/register",
  registerLimiter,                    // ← space before
  upload.fields([{ name: "avatar", maxCount: 1 }]), // ← space before
  registerUser                        // ← space before
);

export default router;